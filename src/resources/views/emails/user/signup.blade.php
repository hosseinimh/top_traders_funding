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
                <img src="https://toptradersfunding.com/assets/images/logo-large.png" alt="Top Traders Funding">
            </div>
            <div style="background-color: #2f343b; display: flex; flex-direction: row; justify-content: space-between; border-radius: 1rem; margin: 1rem 0; padding: 0 1rem;">
                <div style="flex: 1; padding: 1rem; min-width: 50%;">
                    <h4 style="font-size: 0.75rem;">{{ __('user.signup_title') }}</h4>
                    <div style="padding-top: 1rem; font-size: 0.75rem;">
                        @if ($dir === 'rtl')
                        <span style="padding-left: 1rem; font-weight: 300;">
                            @else
                            <span style="padding-right: 1rem; font-weight: 300;">
                                @endif
                                {{ __('user.signup_description')}}</span>
                            <div style="padding-top: 2rem;">
                                <span style="color: #8f959e;">{{ __('user.signup_username') }}:</span>
                                <span>{{$username}}</span>
                            </div>
                            <div style="padding-top: 1rem;">
                                <span style="color: #8f959e;">{{ __('user.signup_password') }}:</span>
                                <span>{{$password}}</span>
                            </div>
                            <div>
                                <a href="https://toptradersfunding.com/panel/users/login" target="_blank" rel="noreferrer" style="text-decoration: none; margin-top: 2rem; height: 2.75rem; width: fit-content; padding: 0 1.25rem; line-height: 2.75rem; border-radius: 0.625rem; cursor: pointer; white-space: nowrap; text-align: center; display: inline-block; position: relative; color: #fff; background-color: #0042a0;">{{ __('user.signup_btn') }}</a>
                            </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; flex: 1; padding: 1rem; max-width: 50%;">
                    <img src="https://toptradersfunding.com/assets/images/signup.png" style="max-width: 80%; border-radius: 1rem;" />
                </div>
            </div>
        </div>
</body>

</html>