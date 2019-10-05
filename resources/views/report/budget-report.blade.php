<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>blueBOX Budget Report</title>
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
        <style type="text/css">
            p {
                color: white !important;
            }
            span{
                  color: hotpink !important;
            }
            .scroller {
              overflow-y: scroll;
            }
            .scroller::-webkit-scrollbar {
              width: 4px;
            }
            a {
              cursor: pointer !important;
            }
            li{
                list-style: none;
            }
        </style>
        </head>
            <body>
    <section style="width: 100%;margin: auto;height:auto; padding-bottom:20px;box-shadow: 0 0 10px #f58731;color: grey; border-radius: 5px;background: #2b2b2b;">
        <div id="head_1" style="background: #f58731; height: 80px;">
         <h2 style="margin: 0;padding: 25px;color: white;background: #0094E7;font-family:sans-serif;font-weight: bold;">blueBOX Report</h2><br><br>
        </div><br><br>

        <div id="box" style="width: 95%; margin: auto; color: white; padding: 10px; background: #2b2b2b;">
            <h4 style="color: white !important;">Hello <b style="color: #e6e6e6 !important;">{{ $item }} --- [<span style="color: dodgerblue !important;"> {{$user->username}} </span>] with email [<span style="color: dodgerblue !important;"> {{$user->email}} </span>] sent you a budget report</b></h4>
                <h5 style="color: white">
                    <span>Budget Title: {{$msg['budget_title']}} / </span>
                    <span>Budget Amount: {{$msg['budget_amount']}}</span>
                </h5>
                <ul data-not_allocated-list id="budget-list" style="width: 80%; margin:auto; overflow:auto; height:30vh;">
                    <h3 style="color: white; font-size: 20px;">Allocated Budget</h3>
                     @foreach ($msg['allocated'] as $allocated) 
                     @if ($allocated->priority == 'Highest')
                         <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid dodgerblue; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                     @elseif ($allocated->priority == 'Medium')
                         <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid orange; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                     @elseif ($allocated->priority == 'Lowest')
                         <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid red; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                     @endif                       
                            <div id="cal_border-design" class="card shadow py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    @if ($allocated->priority == 'Highest')
                                      <span class="list-edit list-item" style="color: dodgerblue !important;">{{$allocated->title}}:</span>
                                    @elseif ($allocated->priority == 'Medium')
                                         <span class="list-edit list-item" style="color: orange !important;">{{$allocated->title}}:</span>
                                    @elseif ($allocated->priority == 'Lowest')
                                         <span class="list-edit list-item" style="color: red !important;">{{$allocated->title}}:</span>
                                    @endif
                                    <span class="list-edit list-amount" style="color: black !important;">{{$allocated->item_amount}}</span>
                                    </div>
                                    <div name="comments" rows="4"
                                    class="list-edit list-description" style="font-weight: normal;">{{$allocated->description}}</div><br><br>

                                    <span class="list-edit list-item" style="color: black !important;font-weight: normal; background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->category}}</span>
                                    @if ($allocated->priority == 'Highest')
                                    <span class="list-edit list-amount" style="color: dodgerblue !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @elseif ($allocated->priority== 'Medium')
                                          <span class="list-edit list-amount" style="color: orange !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @elseif ($allocated->priority == 'Lowest')
                                          <span class="list-edit list-amount" style="color: red !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @endif
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                    @endforeach
                </ul>

                <ul data-not_allocated-list id="budget-list" style="width: 80%; margin:auto; overflow:auto; height:30vh;">
                    <h3 style="color: white; font-size: 20px;">Non Allocated Budget</h3>
                     @foreach ($msg['not_allocated'] as $not_allocated) 

                         @if($not_allocated->priority == 'Highest')
                             <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid dodgerblue; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                         @elseif($not_allocated->priority == 'Medium')
                             <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid orange; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                         @elseif($not_allocated->priority == 'Lowest')
                             <li class="budget-item" style="color: grey; font-size: 15px; border-left: 3px solid red; background: white; padding: 10px; border-bottom: 1px solid lightgrey;">
                         @endif
                            <div id="cal_border-design${id}" class="card shadow py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    @if($not_allocated->priority == 'Highest')
                                      <span class="list-edit list-item" style="color: dodgerblue !important;">{{$not_allocated->title}}:</span>
                                    @elseif($not_allocated->priority == 'Medium')
                                         <span class="list-edit list-item" style="color: orange!important;">{{$not_allocated->title}}:</span>
                                    @elseif($not_allocated->priority == 'Lowest')
                                         <span class="list-edit list-item" style="color: red !important;">{{$not_allocated->title}}:</span>
                                    @endif
                                    <span class="list-edit list-amount" style="color: black !important;">{{$not_allocated->item_amount}}</span>
                                    </div>
                                    <div name="comments" rows="4"
                                    class="list-edit list-description" style="font-weight: normal;">{{$not_allocated->description}}</div><br><br>
                                    <span class="list-edit list-item" style="color: black !important;font-weight: normal; background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$not_allocated->category}}</span>
                                    @if($not_allocated->priority == 'Highest')
                                    <span class="list-edit list-amount" style="color: dodgerblue !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @elseif($not_allocated->priority == 'Medium')
                                          <span class="list-edit list-amount" style="color: orange !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @elseif($not_allocated->priority  == 'Lowest')
                                          <span class="list-edit list-amount" style="color: red !important;font-weight: normal;  background: lightgrey; padding: 5px; border-radius: 20px; font-size: 12px;">{{$allocated->priority}}</span>
                                    @endif
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                    @endforeach
                </ul>
        </div>
    </section>
</html>