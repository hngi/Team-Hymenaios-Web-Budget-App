<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>blueBOX New Password</title>
        <style type="text/css">
            p {
                color: white !important;
            }
            span{
                  color: hotpink !important;
            }
        </style>
        </head>
            <body>
    <section style="width: 100%;margin: auto;height:auto; padding-bottom:20px;box-shadow: 0 0 10px #f58731;color: grey; border-radius: 5px;background: #2b2b2b;">
        <div id="head_1" style="background: #f58731; height: 80px;">
         <h2 style="margin: 0;padding: 25px;color: white;background: #0094E7;font-family:sans-serif;font-weight: bold;">blueBOX Budget App</h2><br><br>
        </div>

        <div id="box" style="width: 95%; margin: auto; color: white; padding: 10px; background: #2b2b2b;"><br>
            <h4>Hello <b>{{$user->username}} --- [<span style="color: hotpink !important;">{{$user->email}}</span>]</b></h4>
            <div id="third_block" style="color: white;">
                    <p>Please copy the code below to change your password!</p><br><br>
                    <p style="text-align:center; background: #0094E7; width: 20%; height: 30px; padding-top: 10px; margin: auto; font-size: 18px; font-weight: bold;">{{ $user->verifycode }}</p>
                     <p><small style="font-size: 16px;">Please copy verification code and follow the <a href="https://app-hymenaios.firebasewebapp.com/reset.html">link</a> to change password!</small></p>
                    <h5 style="text-align:right;">Team blueBOX</h5>
                    <p style="text-align:left;">You are getting this email because you have requested to change your password, if this was not authorize by you please discard.</p>
            </div>
        </div>
    </section>
</html>
