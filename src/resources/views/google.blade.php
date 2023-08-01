@php
if (!app()->isLocale(\App\Constants\Locale::short(\App\Constants\Locale::FA))) {
$direction = 'ltr';
$cssFilename = 'style.css';
}else {
$direction = 'rtl';
$cssFilename = 'style_rtl.css';
}

try {
$cssFileModified = substr(md5(filemtime('assets/css/'.$cssFilename)), 0, 6);
} catch (\Exception) {
$cssFileModified = '';
}

try {
$jsFilename = 'assets/js/index.js';
$jsFileModified = substr(md5(filemtime($jsFilename)), 0, 6);
} catch (\Exception) {
$jsFileModified = '';
}
@endphp
<!DOCTYPE html>
<html lang="{{app()->currentLocale()}}" dir="{{$direction}}">

<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="apple-touch-icon" sizes="180x180" href="{{$THEME::BASE_URL}}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$THEME::BASE_URL}}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$THEME::BASE_URL}}/favicon-16x16.png">
    <link rel="manifest" href="{{$THEME::BASE_URL}}/site.webmanifest">
    <link rel="mask-icon" href="{{$THEME::BASE_URL}}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>{{ __('general._title') }}</title>
    <link href="{{$THEME::CSS_PATH}}/{{$cssFilename}}?v={{$cssFileModified}}" rel="stylesheet">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
</head>

<body>
    <div id="root">
        <div class="login-page d-flex-wrap">
            <div class="login-info d-flex-column">
                <div class="logo"><img src="/assets/images/logo-dark.png" alt=""></div>
                <div class="img"><img src="/assets/images/screen-rtl.png" alt=""></div>
                <div class="info">
                    <div>{{ __('general._title') }}</div>
                    <div style="direction: ltr;">{{ __('general._subTitle') }}</div>
                </div>
            </div>
            <div class="login-box d-flex-column">
                <div class="login-form">
                    <div class="title pd-t-30 pd-d-20">
                        <h2 class="text">{{ __('google.login') }}</h2><span>{{ __('google.login_description') }}</span>
                    </div>
                    <div class="line-gr mb-20"></div>
                    <div class="list-input">
                        <div class="d-flex d-flex-column">
                            <div class="input-text input-bg input-border pd-dir-10 mb-30"><input id="username" name="username" placeholder="{{ __('google.username') }}" type="text" class="" autocomplete="false" value="" style="text-align: left; direction: ltr;" disabled>
                                <div class="icon"><i class="icon-frame-14"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="list-input">
                        <div class="d-flex d-flex-column">
                            <div class="input-text input-bg input-border pd-dir-10 mb-30"><input id="password" name="password" placeholder="{{ __('google.password') }}" type="password" class="" autocomplete="false" value="" style="text-align: left; direction: ltr;" disabled>
                                <div class="icon"><i class="icon-eye3 icon-clickable"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex-column align-center"><button class="btn btn-primary mb-10" type="button" title="{{ __('google.login_btn') }}" disabled>{{__('google.login_btn')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var token;
        <?php
        if (isset($token)) {
            echo "token = '$token';";
        }
        echo "var BASE_URL='" . $THEME::BASE_URL . "';";
        ?>
        axios.defaults.withCredentials = true;
        if (token) {
            login();
        }

        async function login() {
            try {
                const response = await axios.post(`${BASE_URL}/u/users/login_token`, {
                    token
                }, {
                    headers: {
                        " Content-Type": "application/json",
                    },
                });
                if (response?.data?.item) {
                    const text = CryptoJS.AES.encrypt(JSON.stringify(response.data.item), "top_traders_funding").toString();
                    localStorage.setItem('user', text);
                }
            } catch {}
            window.location.href = `${BASE_URL}`;
        }
    </script>
</body>

</html>