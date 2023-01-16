yabai_path="$1"

pgrep -x yabai > /dev/null

if [ $? -eq 1 ]; then
  echo "yabai_error"
  exit 0
fi

current_window=$($yabai_path -m query --windows --window 2>/dev/null)
if [ -z "$current_window" ]; then
  current_window="null"
fi

displays=$($yabai_path -m query --displays)
if [ -z "$displays" ]; then
  displays=$($yabai_path -m query --displays)
fi

spaces=$($yabai_path -m query --spaces)
if [ -z "$spaces" ]; then
  spaces=$($yabai_path -m query --spaces)
fi

sip=$(csrutil status)
shadow_enabled=$($yabai_path -m config window_shadow)

$yabai_path -m signal --add event=space_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite on space change"
$yabai_path -m signal --add event=display_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite on display focus change"
$yabai_path -m signal --add event=window_focused action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite when focused application changes"
$yabai_path -m signal --add event=application_front_switched action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite when front application switched application changes"
$yabai_path -m signal --add event=window_destroyed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite when an application window is closed"
$yabai_path -m signal --add event=window_title_changed action="osascript -e 'tell application id \"tracesOf.Uebersicht\" to refresh widget id \"simple-bar-lite-main-jsx\"'" label="Refresh simple-bar-lite when current window title changes"

echo $(cat <<-EOF
  {
    "currentWindow": $current_window,
    "displays": $displays,
    "spaces": $spaces,
    "sip": "$sip",
    "shadow": "$shadow_enabled"
  }
EOF
)
