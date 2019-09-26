<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Budget;


class UserBudgetController extends Controller
{
	public function create(Request $request, Budget $budget)
    {
        $this->validateRequest($request);
        //start temporay transaction
        DB::beginTransaction();
        try {
            $budget_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);

            $budget->title = $request->input('title');
            $budget->owner_id = Auth::user()->id;
            $budget->description = $request->input('description');
            $budget->budget_amount = $request->input('currency') ." ". $budget_amount;
            $budget->save();

            $msg['budget']  =  $budget;
            $msg['message'] = "Budget has been created, add items to allocate budget!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 201);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: Budget not created, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }


    }

    public function update(Request $request, Budget $budget) {
         $this->validateRequest($request);
        //start temporay transaction
         try {
            $budget_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);

            $budget->title = $request->input('title');
            $budget->owner_id = Auth::user()->id;
            $budget->description = $request->input('description');
            $budget->budget_amount = $request->input('currency') ." ". $budget_amount;
            $budget->save();

            $msg['budget']  =  $budget;
            $msg['message'] = "Budget has been updated!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 200);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: Budget not updated, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }

    }

    public function validateRequest(Request $request){
		$rules = [
			'title' => 'required|string',
			'description' => 'required|string',
            'currency' => array(
                              'required',
                              'regex:/(^([NGN,USD,EUR]+)(\d+)?$)/u'
                            ),
			'amount' => array(
                              'required'
                            ),
		];

		$messages = [
			'required' => ':attribute is required',
            'currency' => ':attribute should have currency signs only!',
            'amount' => ':attribute should be an integer value!'
		];

		$this->validate($request, $rules, $messages);
		}

}
