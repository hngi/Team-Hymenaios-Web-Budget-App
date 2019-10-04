<?php
namespace App\Http\Controllers;

use App\User;
use App\Mail\BudgetReport;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Budget;
use App\Item;

class CalculatorController extends Controller
{

    public function calculate($budget_id, $key ='calc') {
        $budget = Budget::where('id', $budget_id)->where('owner_id', Auth::user()->id)->first();
        $items = item::where('budget_id', $budget_id)
                ->orderBy('tag', 'desc')
                ->get();
        if ($budget) {
                     //format budget money
                $format_budget = explode(".", $budget->budget_amount);
                $format_budget_2 = filter_var($format_budget[0], FILTER_SANITIZE_NUMBER_INT);
                $allocated = [];
                $not_allocated = [];
                $low_budget = [];
                $i = 0;
                foreach ($items as $item) {
                    $format_item  = explode(".", $item->item_amount);
                    $format_item_2 = filter_var($format_item[0], FILTER_SANITIZE_NUMBER_INT);

                    if ( $format_budget_2 > 0) {
                        $format_budget_2 = $format_budget_2 - $format_item_2;
                        $details = explode("-", $format_budget_2);
                        if ($details[0] == "") {
                             $values = [$item->title, number_format($format_item_2, 2) , number_format($details[1], 2)];

                             array_push($low_budget, $values);
                             array_push($not_allocated, $item);
                             $format_budget_2 = $format_item_2 - $details[1];  
                        }else {
                            array_push($allocated, $item);
                        } 
                    }else {
                        array_push($not_allocated, $item);
                    }
                    $i++;
                }
            $msg['message'] = "Allocated and Not allocated budget items!";
            $msg['budget_title'] = $budget->title;
            $msg['budget_amount'] = $budget->budget_amount;
            $msg['low_budget'] =  $low_budget;
            $msg['allocated'] =  $allocated;
            $msg['not_allocated'] =  $not_allocated;
            if($key == 'calc'){
                 return response()->json($msg, 200);
            }else if($key == 'mail_report') {
                 return $msg;
            }
        }else {
            $msg['error'] = "Error: Allocation for this budget is not allowed, please try again!";
            return response()->json($msg, 402);
        }
      

    }
      public function mailReport(Request $request, $budget_id) {
           $user = Auth::user();
           $msg = $this->calculate($budget_id, $key = 'mail_report');
           $this->validateRequest($request);
           $items = $request->input('emails');
           // $value = [];
           // foreach ($msg['allocated'] as $key) {
           //  array_push($value, $key);
           // }
           //  return response()->json($value, 200);
           try{
                 foreach($items as $item) {
                      Mail::to($item['email'])->send(new BudgetReport($msg, $item['email'], $user));
                  }
                  $res['status'] = "All budget Report mail sent successfully!";
                  return response()->json($res, 200);

            }catch(\Exception $e) {

                  //if any operation fails, Thanos snaps finger - user was not created
                  DB::rollBack();

                  $res['error'] = "Email not sent an error occured, please try again!";
                  $res['hint'] = $e->getMessage();
                  return response()->json($res, 501);
            }
      }

      public function validateRequest(Request $request){
        $rules = [
            'emails.*.email' => 'required|email'
        ];

        $messages = [
            'required' => ':attribute is required',
            'emails' => ':attribute is not valid!',
        ];

        $this->validate($request, $rules, $messages);
        }

}
