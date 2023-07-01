<!DOCTYPE html>
<html lang="{{$locale}}" dir="{{$dir}}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Traders Funding</title>
</head>

<body style="background-color: #141a22; color: #fff; font-family: tahoma, sans-serif;">
    @if ($dir === 'rtl')
    <div style="padding: 2rem; direction: rtl; background-color: #141a22;">
        @else
        <div style="padding: 2rem; direction: ltr; background-color: #141a22;">
            @endif
            <div>
                <img src="https://toptradersfunding.com/assets/images/logo-dark.png" style="width: 200px" alt="Top Traders Funding">
            </div>
            @yield('content')
        </div>
</body>

</html>