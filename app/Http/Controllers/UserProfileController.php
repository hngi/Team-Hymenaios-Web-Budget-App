<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use Cloudder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
	public function index(User $user)
    {
        $user = Auth::user();

        return response()->json(['data' => [ 'success' => true, 'user' => $user ]], 200);
    }
	public function edit(Request $request)

	{
		$user = Auth::user();
		$this->validateRequest($request);

		DB::beginTransaction();
        $token = Auth::guard()->login($user);
		try {
            $user->username = $request->input('username');
 			$user->first_name = $request->input('first_name');
	        $user->last_name = $request->input('last_name');
	        $user->bio = $request->input('bio');
	        $user->dob = $request->input('dob');
	        $user->save();

			$msg['message'] = "Account Updated Successfully!";
	        $msg['user'] = $user;
            $msg['token'] = 'Bearer ' . $token;
            $msg['image_link'] = 'https://res.cloudinary.com/getfiledata/image/upload/';
            $msg['image_format'] = 'w_200,c_thumb,ar_4:4,g_face/';
	
			//if operation was successful save changes to database
			DB::commit();

			return response()->json($msg, 200);

		}catch(\Exception $e) {

			//if any operation fails, Thanos snaps finger - user was not created
			DB::rollBack();

			$msg['error'] = "Error: There was an unexpected error, please try again!";
			$msg['hint'] = $e->getMessage();
			return response()->json($msg, 501);

		}

	}


    public function image(Request $request)
    {
        $this->validate($request, [
            'image' => 'image|max:4000|required',
            ]);
        $user = Auth::user();

        if ($request->hasFile('image') && $request->file('image')->isValid()){
            //Check old image and delete it if true
            if ($user->image != "noimage.png") {
                $oldImage = pathinfo($user->image, PATHINFO_FILENAME);

                try {
                    $delete_old_image = Cloudder::destroyImage($oldImage);
                } catch (Exception $e) {
                    $mes['error'] = "Try Again";
                    return back()->with($mes);
                }
            }

            $user = $request->file('image');
            $filename = $request->file('image')->getClientOriginalName();
            $image = $request->file('image')->getRealPath();
            $cloudder = Cloudder::upload($image);

            //Request the image info from api and save to db
            $uploadResult = $cloudder->getResult();
            //Get the public id or the image name
            $file_url = $uploadResult["public_id"];
            //Get the image format from the api
            $format = $uploadResult["format"];

            $user_image = $file_url.".".$format;

            $this->saveImages($request, $user_image);

            $res['message'] = "Upload Successful!";
            $res['image_link'] = 'https://res.cloudinary.com/getfiledata/image/upload/';
            $res['image_prop'] = [
              'cropType1' => 'c_fit',
              'cropType2' => 'g_face',
              'imageStyle' => 'c_thumb',
              'heigth' => 'h_577',
              'width' =>  '433',
              'widthThumb' => 'w_200',
              'aspectRatio' => 'ar_4:4'
            ];
            $res['image'] = $user_image;
            return response()->json($res, 200);

        }
    }

   public function saveImages(Request $request, $user_image)
    {
        $user = Auth::user();

        $user->image = $user_image;
        $user->save();

    }
    
    public function destroy(Request $request) {
        $user = Auth::user();
        if($user) {
            $user->delete();
            $res['success'] = true;
            $res['message'] = 'User account deleted!';
            return response()->json($res);
        }else {
            $res['error'] = false;
            $res['message'] = 'User not found!';
            return response()->json($res);
        }
    }

    public function validateRequest(Request $request){
		$rules = [
			'username' => 'required|string',
			'first_name' => 'required|string',
			'last_name' => 'required|string',
			'dob' => 'required',
			'bio' => 'required|string'
		];

		$messages = [
			'required' => ':attribute is required',
		];

		$this->validate($request, $rules, $messages);
		}

    public function validatePassword(Request $request)
    {
       $rules = [
        'old_password'=> 'required|string',
        'password' => 'required|min:8|different:old_password'
        ];
        $messages = [
            'required' => ':attribute is required'
        ];
        $this->validate($request, $rules);
    }


}
