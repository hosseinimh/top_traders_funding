@extends('emails.user.layout')
@section('content')
<div style="background-color: #2f343b; display: flex; flex-direction: row; justify-content: space-between; border-radius: 1rem; margin: 1rem 0; padding: 0 1rem;">
    <div style="flex: 1; padding: 1rem; min-width: 50%;">
        <h4 style="font-size: 0.75rem;">{{ __('user.email_token_title') }}</h4>
        <div style="padding-top: 1rem; font-size: 0.75rem;">
            @if ($dir === 'rtl')
            <span style="padding-left: 1rem; font-weight: 300;">
                @else
                <span style="padding-right: 1rem; font-weight: 300;">
                    @endif
                    {{ __('user.email_token_description')}}</span>
                <div>
                    <a href="{{$THEME::BASE_URL}}/panel/users/verify_request2/{{$token}}" target="_blank" rel="noreferrer" style="text-decoration: none; margin-top: 2rem; height: 2.75rem; width: fit-content; padding: 0 1.25rem; line-height: 2.75rem; border-radius: 0.625rem; cursor: pointer; white-space: nowrap; text-align: center; display: inline-block; position: relative; color: #fff; background-color: #0042a0;">{{ __('user.email_token_btn') }}</a>
                </div>
        </div>
    </div>
    <div style="display: flex; justify-content: flex-end; flex: 1; padding: 1rem; max-width: 50%;">
        <img src="{{$THEME::BASE_URL}}/assets/images/forgot_password.jpg" style="max-width: 80%; border-radius: 1rem;" />
    </div>
</div>
@endsection