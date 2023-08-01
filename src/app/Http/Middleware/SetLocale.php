<?php

namespace App\Http\Middleware;

use App\Constants\Locale;
use App\Models\Error;
use App\Services\UserService;
use Closure;
use Illuminate\Http\Request;
use PharIo\Manifest\Url;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$this->setLocale($request->_locale)) {
            $this->setLocale($request->session()->pull('_locale', Locale::FA));
        }
        if ($request->query->has('_locale')) {
            return redirect($request->url());
        }
        return $next($request);
    }

    private function setLocale(mixed $locale): bool
    {
        if (isset($locale) && in_array($locale, Locale::toArray())) {
            app()->setLocale(Locale::short($locale));
            session(['_locale' => $locale]);
            if (auth()->user()) {
                $service = new UserService();
                $service->setLocale(auth()->user(), $locale);
            }
            return true;
        }
        return false;
    }
}
