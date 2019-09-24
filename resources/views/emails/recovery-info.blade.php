<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hymenaios New Password</title>
        </head>
            <body>
    <section style="width: 80%;margin: auto;height:auto; padding-bottom:20px;box-shadow: 0 0 10px #f58731;color: grey; border-radius: 5px;">
        <div id="head_1" style="background: #f58731; height: 80px;">
         <h2 style="margin: 0;padding: 25px;color: white;background: #f58731;font-family:sans-serif;font-weight: bold;">Hymenaios</h2><br><br>
        </div>

        <div id="box" style="width: 95%; margin: auto;"><br>
            <h4>Hello <b>{{$user->username}} --- with email <span style="color: #f58731;">{{$user->email}}</span></b></h4>
            <div id="third_block">
                    <p>Please copy the code below to change your password!</p><br><br>
                    <p style="text-align:center;">{{ $user->verifycode }}"></p>

                    <h5 style="text-align:right;">Team Hymenaios</h5>
                    <p style="text-align:left;">You are getting this email because you have requested to change your password, if this was not authorize by you please discard.</p>
            </div>
        </div>
    </section>
</html>
