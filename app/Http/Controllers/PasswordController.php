<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewPassword;

use App\User;

class PasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

        //geberate new password for the user
    public function generatedPassword()
    {
    return substr(md5(time()), 0, 6);
    }


    public function resetpassword(Request $request)
    {

    // Do a validation for the input
        $this->validate($request, [
        	'email' => 'required|email',
        ]);

        $userEmail = $request->input('email');

       $VerifyEmail = User::where('email', $userEmail)->first();

       if ($VerifyEmail == null)
       {
        return response()->json(['data' =>['success' => false, 'message' => 'User Not Found']], 404);
       }
       
        try{
            $VerifyEmail->verifycode = $this->generatedPassword();
            Mail::to($VerifyEmail->email)->send(new NewPassword($VerifyEmail));
            $VerifyEmail->save();
            return response()->json(['data' => ['success' => true, 'message' => "Email has been sent. Please check your inbox for your new password"]], 200);
          } catch (\Exception $e) {
             return response()->json(['data' => ['success' => true, 'message' => "Email not sent, please try again", 'hint' => $e->getMessage()]], 500);
          }
    }

}
