<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Budget;
use App\Item;

class ItemController extends Controller
{
    public function showAll($budget_id) {
        $items = item::where('budget_id', $budget_id)
                  ->orderBy('tag', 'desc')
                  ->get();

        if ($items) {
            $msg['items'] = $items;
            $msg['message'] = 'Successful';
            return response()->json([$msg], 200);
        }else {
            $msg['message'] = 'Not Found';
            return response()->json([$msg], 404);
        }
    }
     public function totalXpences() {
        $user = Auth::user()->id;
        $sum = 0;
        $items_amount = item::where('owner_id', $user)
                  ->pluck('item_amount');
        $tag_3 = item::where('owner_id', $user)
                      ->where('tag', 3)
                      ->count();
        $tag_2 = item::where('owner_id', $user)
                      ->where('tag', 2)
                      ->count();
        $tag_1 = item::where('owner_id', $user)
                      ->where('tag', 1)
                      ->count();
        $total_tag = $tag_3 + $tag_2 + $tag_1;

        $highest_priority_percent = $tag_3 / $total_tag * 100;
        $medium_priority_percent = $tag_2 / $total_tag * 100;
        $lowest_priority_percent = $tag_1 / $total_tag * 100;


        foreach ($items_amount as $item_amount) {
             $format_item = explode(".", $item_amount);
             $format_currency = explode(" ", $item_amount);
             $format_item_2 = filter_var($format_item[0], FILTER_SANITIZE_NUMBER_INT);
            $sum = $sum + $format_item_2;
        }

            $msg['total_expences'] = $format_currency[0]. " " .number_format($sum, 2);
            $msg['highest_priority_percent'] = number_format($highest_priority_percent).'%';
            $msg['medium_priority_percent'] = number_format($medium_priority_percent).'%';
            $msg['lowest_priority_percent'] = number_format($lowest_priority_percent).'%';
            $msg['message'] = 'Successful';
            return response()->json([$msg], 200);
    }
	public function create(Request $request,item $item, $budget_id)
    {
        $user = Auth::user();
        $this->validateRequest($request);

        $budget_amount = Budget::where('id', $budget_id)->pluck('budget_amount');
        $format_budget = explode(".", $budget_amount);
        $format_budget_2 = filter_var($format_budget[0], FILTER_SANITIZE_NUMBER_INT);

        //start temporay transaction
        DB::beginTransaction();
        try {
            $curr = explode(" ", $user->total_income);
            if($request->input('currency') != $curr[0]){
                $msg['error'] = "Error: Currency Must be the same as your total income!";
                return response()->json($msg, 422);
            }
            if ($request->input('amount') > $format_budget_2) {
                $msg['error'] = "Error: Your item amount should be below the budget amount!";
                return response()->json($msg, 422);
            }
            $item_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);
            if (ucwords($request->input('priority')) == 'Highest') {
                $tag = 3;
            }elseif(ucwords($request->input('priority')) == 'Medium'){
                $tag = 2;
            }elseif(ucwords($request->input('priority')) == 'Lowest') {
                $tag = 1;
            }
             $item->title = ucwords($request->input('title'));
             $item->owner_id = Auth::user()->id;
             $item->budget_id = $budget_id;
             $item->priority = ucwords($request->input('priority'));
             $item->tag = $tag;
             $item->category = $request->input('category');
             $item->description = ucwords($request->input('description'));
             $item->item_amount = $request->input('currency') ." ". $item_amount;
             $item->save();

            $msg['item']  =  $item;
            $msg['message'] = "An item has been created!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 201);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: item not created, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }


    }

    public function update(Request $request, $budget_id, $id) {
        $user = Auth::user();
         $this->validateRequest($request);

        $budget_amount = Budget::where('id', $budget_id)->pluck('budget_amount');
        $format_budget = explode(".", $budget_amount);
        $format_budget_2 = filter_var($format_budget[0], FILTER_SANITIZE_NUMBER_INT);
        //start temporay transaction
         try { 
             $curr = explode(" ", $user->total_income);
            if($request->input('currency') != $curr[0]){
                $msg['error'] = "Error: Currency Must be the same as your total income!";
                $msg['hint'] = $e->getMessage();
                return response()->json($msg, 422);
            }
            if ($request->input('amount') > $format_budget_2) {
                $msg['error'] = "Error: Your item amount should be below the budget amount!";
                return response()->json($msg, 422);
            }
            if (ucwords($request->input('priority')) == 'Highest') {
                $tag = 3;
            }elseif(ucwords($request->input('priority')) == 'Medium'){
                $tag = 2;
            }elseif(ucwords($request->input('priority')) == 'Lowest') {
                $tag = 1;
            }
            $item = item::find($id);
            $item_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);
            if ($item) {
                 $item->title = ucwords($request->input('title'));
                 $item->owner_id = Auth::user()->id;
                 $item->budget_id = $budget_id;
                 $item->priority = ucwords($request->input('priority'));
                 $item->tag = $tag;
                 $item->category = $request->input('category');
                 $item->description = ucwords($request->input('description'));
                 $item->item_amount = $request->input('currency') ." ". $item_amount;
                $item->save();
            }else{
                $msg['message'] = "Item not found!";
                return response()->json($msg, 404);
            }
           
            $msg['item']  =  $item;
            $msg['message'] = "Item has been updated!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 200);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: item not updated, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }

    }

    public function destroy($id) {
        $user = Auth::user();
        $del_item = item::where('id', $id)->where('owner_id', $user->id)->first();
        if($del_item) {
            $del_item->delete();
            $res['success'] = true;
            $res['message'] = 'Item deleted!';
            return response()->json($res);
        }else {
            $res['error'] = false;
            $res['message'] = 'Item not found!';
            return response()->json($res);
        }
    }

    public function validateRequest(Request $request){
		$rules = [
			'title' => 'required|string',
			'description' => 'string',
            'category' => 'required|string',
            'priority' => 'required|string',
            'currency' => array(
                              'required',
                              'regex:/(^([NGN,USD,EUR,GBR]+)?$)/u'
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
