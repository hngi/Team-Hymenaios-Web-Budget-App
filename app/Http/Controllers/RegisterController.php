<?php
namespace App\Http\Controllers;

use App\User;
use App\Mail\VerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
	public function register(Request $request)

	{
		$this->validateRequest($request);

		$verifycode = Str::random(6);
		$default_image = 'noimage.png';
		//start temporay transaction
		DB::beginTransaction();

		try {

			$user = User::create([
			'email' => $request->input('email'),
			'username' => $request->input('username'),
			'password' => Hash::make($request->get('password')),
			'verifycode' => $verifycode,
			'image' =>  $default_image
			]);


			Mail::to($user->email)->send(new VerifyEmail($user));


			$msg['message'] = "Hello $user->username,  thanks for signing up! A verification mail has been Sent to your account -> $user->email";

			$msg['verified'] = false;


			//if operation was successful save changes to database
			DB::commit();

			return response()->json($msg, 200);

		}catch(\Exception $e) {

			//if any operation fails, Thanos snaps finger - user was not created
			DB::rollBack();

			$msg['error'] = "Error: Account not created, please try again!";
			$msg['hint'] = $e->getMessage();
			return response()->json($msg, 501);


		}


	}

    public function validateRequest(Request $request){
		$rules = [
			'email' => 'required|email|unique:users',
			'username' => 'required|string|unique:users',
    		'password' => 'required|min:8',
		];
		$messages = [
			'required' => ':attribute is required',
			'email' => ':attribute not a valid format',
			'username' => ':attribute already exist, use another username!',
	];
		$this->validate($request, $rules, $messages);
		}

}
