@extends('app')

@section('content')
  <!-- Page Breadcrumb -->
  @include('articles._breadcrumb', ['route' => 'users'])

<div id="w">
    <div id="content" class="clearfix">
      @include('errors.errors')
      <div id="userphoto"><img src="{{ asset('images/avatar.png') }}" alt="default avatar"></div>
      <h1>{{ ucfirst($user->username) }}'s profile</h1>

      <nav id="profiletabs">
        <ul class="clearfix">
          @if ($errors->any())
          <li><a href="#activity">Activity</a></li>
          <li><a href="#settings">Settings</a></li>
          @if(Auth::check())
            @if( (Auth::user()->id === $user->id) or (Auth::user()->group_id === 1) )
            <li><a href="#edit_profile" class="sel">Edit profile</a></li>
            @endif
          @endif
          @else
          <li><a href="#activity" class="sel">Activity</a></li>
          <li><a href="#settings">Settings</a></li>
          @if(Auth::check())
          	@if( (Auth::user()->id === $user->id) or (Auth::user()->group_id === 1) )
          	<li><a href="#edit_profile">Edit profile</a></li>
          	@endif
          @endif
          @endif
        </ul>
      </nav>
      
      @if ($errors->any())
      <section id="activity" class="hidden">
      @else
      <section id="activity">
      @endif
        <p>Most recent actions:</p>
        @if (count($latestActivities) < 1)
        <p><i>No activities to display</i></p>
        @else
          @foreach($latestActivities as $activity)
          <?php $result = preg_split('/@ /',$activity->text); ?>
            <p class="activity">{{ $activity->created_at->diffForHumans() }} {{ $result[0] }} 
              @if (($result[0] === 'commented ') or ($result[0] === 'deleted comment ') or ($result[0] === 'edited comment '))
              in <b>{{ $result[1] }}</b>
              @elseif ($result[0] === 'deleted article ')
              <b>{{ $result[1] }}</b>
              @elseif ($result[0] === 'edited ')
                @if ($result[1] === $user->username)
                his profile
                @else 
                <b>{{ ucfirst($result[1]) }}'s</b> profile
                @endif
              @else
              <b>{{ $result[1] }}</b>
              @endif
            </p>
          @endforeach
        @endif
        <p class="margin-top: 10px">
          @if ($user->group_id <= 2)
          <a role="button" class="btn btn-default" href="{{ url('/articles/users/'. $user->id) }}">{{ ucfirst($user->username) }}'s articles</a>
          @endif
          <a role="button" class="btn btn-default" href="{{ url('/comments/users/'. $user->id) }}">{{ ucfirst($user->username) }}'s comments</a>
        </p>
      </section>

      </section>
      
      <section id="settings" class="hidden">
        <p>User settings:</p>
        
        <p class="setting"><span>E-mail Address</span> {{ $user->email }}</p>
        
        <p class="setting"><span>Group</span> {{ $user->group->name }}</p>

        <p class="setting"><span>Joined</span> {{ $user->created_at->diffForHumans() }}</p>
       
      </section>

      @if(Auth::check())
        @if( (Auth::user()->id === $user->id) or (Auth::user()->group_id === 1) )
          @if ($errors->any())
          <section id="edit_profile">
          @else
          <section id="edit_profile" class="hidden">
          @endif
            <p>Change profile settings:</p>
            {!! Form::model($user, ['method' => 'PATCH', 'url' => 'users/' . $user->id]) !!}
            {!! Form::token() !!}

            <p class="setting"><span>E-mail adress</span> {!! Form::text('email', null, ['class' => 'form-control', 'style' => 'width: 200px', 'placeholder' => 'E-mail address']) !!}</p>
            
            @if(Auth::user()->group_id === 1)
            <p class="setting"><span>Username</span> {!! Form::text('username', null, ['class' => 'form-control', 'style' => 'width: 200px', 'placeholder' => 'Username']) !!}</p>

            <p class="setting"><span>Group</span> {!! Form::select('group_id', \App\Group::all()->lists('name', 'id'), null, ['class' => 'form-control', 'style' => 'width: 200px']) !!}</p>
            @endif

            <p class="setting"><span>Password</span> <input type="password" placeholder="Password" class="form-control" name="password" style="width: 200px"></p>

            <p class="setting"><span>Confirm password</span> <input type="password" placeholder="Confirm password" class="form-control" name="password_confirmation" style="width: 200px"></p>

            {!! Form::submit('Save changes', ['class' => 'btn btn-primary form-control', 'style' => 'margin-right: 300px; margin-left: 300px; width: 150px']) !!}

            {!! Form::close() !!}
          </section>
        @endif
      @endif

    </div><!-- @end #content -->
</div><!-- @end #w -->

@endsection

@section('footer')
<script>
$(document).ready(function(){
  $('#profiletabs ul li a').on('click', function(e){
    e.preventDefault();
    var newcontent = $(this).attr('href');
    
    $('#profiletabs ul li a').removeClass('sel');
    $(this).addClass('sel');
    
    $('#content section').each(function(){
      if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
    });
    
    $(newcontent).removeClass('hidden');
  });
});
</script>
@endsection