<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
     return ["message" => "Welcome To Hymenaios Budget Calculate API, All API Routes Are On {server}/api"];
});
$router->get('/api', function () use ($router) {
    return ["message" => "Hymenaios Budget Calculate API"];
});
//****************Users Routes**************** */
$router->post('/api/user/register', 'RegisterController@register');
$router->post('api/user/verify', 'VerifyUserController@verifyUser');
$router->post('api/user/login', 'LogInController@userLogin');
$router->post('api/password/reset', 'PasswordController@resetpassword');
$router->put('api/password/change', 'ChangePasswordController@updatepassword');