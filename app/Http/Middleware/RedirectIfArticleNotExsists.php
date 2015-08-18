<?php

namespace App\Http\Middleware;

use Closure;
use Blog\db\Models\Article;
use Illuminate\Support\Facades\Response;

class RedirectIfArticleNotExsists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Article::whereSlug($request->segment(3))->get()->isEmpty())
        {
            return response()->json(['error' => 'Article not found!'], 404);
        }

        return $next($request);
    }
}
