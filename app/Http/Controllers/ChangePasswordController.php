<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewPassword;

use App\User;

class ChangePasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    public function updatepassword(Request $request)
    {

    // Do a validation for the input
        $this->validate($request, [
        	'verifycode' => 'required|max:6|min:5',
        	'password'   => 'required|min:6|confirmed',
        ]);

        $verifycode = $request->input('verifycode');
        $password = $request->input('password');

        $checkverifyemail = User::where('verifycode', $verifycode)->first();

       if ($checkverifyemail == null)
       {
        return response()->json(['data' =>['error' => false, 'message' => 'Verification code does not exist']], 401);
       }else{  
        try{
            $checkverifyemail->password = Hash::make($password);
            $checkverifyemail->save();
            return response()->json(['data' => ['success' => true, 'message' => "Your password has been changed"]], 200);
          } catch (\Exception $e) {
             return response()->json(['data' => ['success' => true, 'message' => "Error changing password...."]], 500);
          }
       }
    }
}
