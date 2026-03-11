const W = '#ffffff', _ = null;


function drawPixels(target, grid) {
  const canvas = typeof target === 'string' ? document.getElementById(target) : target;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col) { ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1); }
    });
  });
}


// ── Garrett SVG animation ──
// Plays once automatically on page load.
// After cycle ends, hover (desktop) or tap (mobile) replays from frame 0.
// Mouseleave does NOT interrupt — animation always plays to completion.
(function() {
  var FRAME_COUNT = 11;
  var FRAME_DELAY = 200;

  var currentFrame = 0;
  var timer = null;
  var playing = false;

  function showFrame(idx) {
    for (var i = 0; i < FRAME_COUNT; i++) {
      var el = document.getElementById('garrett-frame-' + i);
      if (el) el.style.display = (i === idx) ? 'inline' : 'none';
    }
    currentFrame = idx;
  }

  function playOnce() {
    if (playing) return;
    playing = true;
    showFrame(0);

    function advance() {
      var next = currentFrame + 1;
      if (next >= FRAME_COUNT) {
        playing = false;
        return;
      }
      showFrame(next);
      timer = setTimeout(advance, FRAME_DELAY);
    }

    timer = setTimeout(advance, FRAME_DELAY);
  }

  // Auto-play once on page load
  playOnce();

  // Re-play on hover (desktop)
  var container = document.querySelector('.garrett-anim');
  if (container) {
    container.addEventListener('mouseenter', playOnce);
    container.addEventListener('touchstart', function(e) {
      e.preventDefault();
      playOnce();
    }, { passive: false });
  }
})();
</script>
</body>
</html>