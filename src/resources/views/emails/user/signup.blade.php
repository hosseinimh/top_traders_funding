<!DOCTYPE html>
<html lang="{{$locale}}" dir="{{$dir}}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ __('general.title')}}</title>
</head>

<body>
    @if ($dir === 'rtl')
    <div style="margin-top: 2rem; direction: rtl;">
        @else
        <div style="margin-top: 2rem; direction: ltr;">
            @endif
            <div>
                <span style="font-family: tahoma, sans-serif; font-size: 1.5rem; font-weight: 600;">{{ __('general._title') }}</span>
            </div>
            <div style="background-color: #F1F4F6; display: flex; flex-direction: row; justify-content: space-between; border-radius: 1rem; margin: 1rem 0; padding: 0 1rem;">
                <div style="min-width: 50%; padding : 1rem;">
                    <h4 style="font-family: tahoma, sans-serif; font-size: 1.3rem;">{{ __('user.signup_title') }}</h4>
                    <div style="display: flex;">
                        @if ($dir === 'rtl')
                        <span style="font-family: tahoma, sans-serif; padding-left: 1rem; font-weight: 600;">
                            @else
                            <span style="font-family: tahoma, sans-serif; padding-right: 1rem; font-weight: 600;">
                                @endif
                                {{ __('user.signup_username')}}</span>
                            <span style="font-family: tahoma, sans-serif;">{{$username}}</span>
                    </div>
                    <div style="display: flex;">
                        @if ($dir === 'rtl')
                        <span style="font-family: tahoma, sans-serif; padding-left: 1rem; font-weight: 600;">
                            @else
                            <span style="font-family: tahoma, sans-serif; padding-right: 1rem; font-weight: 600;">
                                @endif
                                {{ __('user.signup_password')}}</span>
                            <span style="font-family: tahoma, sans-serif;">{{$password}}</span>
                    </div>
                    <div style="margin-top: 2rem;">
                        <a href="https://toptradersfunding.com" target="_blank" style="text-decoration: none; font-family: tahoma, sans-serif; display: inline-block; font-weight: 400; color: #fff; background-color: #3f6ad8; border-color: #3f6ad8; text-align: center; vertical-align: middle; user-select: none;  border: 1px solid; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem;">
                            <span style="padding: 0.1rem 1rem; display: block;">{{ __('user.signup_login') }}</span>
                        </a>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; min-width: 50%; padding : 1rem;">
                    <img src="https://toptradersfunding.com/assets/images/welcome.png" style="max-width: 80%;" />
                </div>
            </div>
        </div>
</body>

</html>