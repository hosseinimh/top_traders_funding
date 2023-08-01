<!DOCTYPE html>
<html lang="{{$locale}}" dir="{{$dir}}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ __('general._title') }}</title>
</head>

<body style="background-color: #141a22; color: #fff; font-family: tahoma, sans-serif;">
    <div style="padding: 2rem; direction: {{$dir}}; background-color: #141a22;">
        <div>
            <img src="{{$THEME::BASE_URL}}/assets/images/logo-dark.png" style="width: 200px" alt="{{ __('general._title') }}">
        </div>
        @yield('content')
    </div>
</body>

</html>