@extends('emails.user.layout')
@section('content')
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
@endsection