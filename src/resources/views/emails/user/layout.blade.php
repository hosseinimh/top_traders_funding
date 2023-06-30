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
            <div style="background-color: #2f343b; display: flex; flex-direction: row; justify-content: space-between; border-radius: 1rem; margin: 1rem 0; padding: 0 1rem;">
                <div style="flex: 1; padding: 1rem; min-width: 50%;">
                    @yield('content')
                </div>
                <div style="display: flex; justify-content: flex-end; flex: 1; padding: 1rem; max-width: 50%;">
                    <img src="https://toptradersfunding.com/assets/images/forgot_password.jpg" style="max-width: 80%; border-radius: 1rem;" />
                </div>
            </div>
        </div>
</body>

</html>