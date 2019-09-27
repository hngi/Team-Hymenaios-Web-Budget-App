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


$router->group(['middleware' => 'jwt.auth', 'prefix' => 'api'], function () use ($router) {

	$router->get('/profile', 'UserProfileController@index');

	// edit users profile
    $router->put('user/edit', 'UserProfileController@edit');

    // upload profile picture
    $router->post('user/image/upload', 'UserProfileController@image');

	// delete users profile
    $router->delete('user/delete', 'UserProfileController@destroy');

});
//The budget Api     
$router->group(['middleware' => 'jwt.auth', 'prefix' => 'api'], function () use ($router) {

	$router->post('budget/create', 'UserBudgetController@create');

    $router->put('budget/{id}/edit', 'UserBudgetController@update');

    $router->get('budget/showAll', 'UserBudgetController@showAll');

    $router->get('budget/{id}/showOne', 'UserBudgetController@showOne');

    $router->delete('budget/{id}/delete', 'UserBudgetController@destroy');

});