<!DOCTYPE html>
<html lang="en">

<head>
  <!--
  <meta http-equiv="refresh" content="2">
  -->
  <!-- <meta http-equiv="refresh" content="10"> -->
  <meta charset="UTF-8">
  <title>KOWLOON 九龍寨城</title>
  
  <link rel="shortcut icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌏</text></svg>" />
  <link href='https://fonts.googleapis.com/css?family=Allerta' rel='stylesheet'>


  <link href='stylesheet-design.css' rel='stylesheet'>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">


</head>


<body id='body'>
<p>KOWLOON Cargo Code Cult 九龍寨城
  - Hardcoded content for all themes, prototype UI/UX menu's open and close but no logic actions</p>

  <div>
    <div style="display: none;">
      <div style="display: flex; gap: 1em; flex-direction: row;"> 
        <div>
          <p>Prototype Wireframe 375px</p>
          <iframe style="width: 375px; height: 300px;" src="./design-hardcoded/index-prototype.php" frameborder="0"></iframe>        
        </div>
        <div>
          <p>Wireframe 428px</p>
          <iframe style="width: 428px; height: 300px;" src="./design-hardcoded/index-prototype.php?width=445&theme=wireframe" frameborder="0"></iframe>
        </div>
        <div >
          <p>Black</p>
          <iframe style="width: 445px; height: 300px;" src="./design-hardcoded/index-prototype.php?width=445&theme=black" frameborder="0"></iframe>
        </div>
        <div>
          <p>Irina</p>
          <iframe style="width: 375px; height: 300px;" src="./design-hardcoded/index-prototype.php?width=445&theme=irina-rimes" frameborder="0"></iframe>
        </div>
        <!-- <div>
          <p>Afterburn mode</p>
        </div> -->
      </div>
    </div>
  </div>

  <div>
    <label><input type="checkbox" checked onclick="hideIframe('wireframe')"/> Toggle Wireframe</label>
    <label><input type="checkbox" checked onclick="hideIframe('black')"/> Toggle Black</label>
    <label><input type="checkbox" checked onclick="hideIframe('irina')"/> Toggle Irina</label>
    <label><input type="checkbox" checked onclick="hideIframe('neon')"/> Toggle Neon</label>
    <label><input type="checkbox" checked onclick="hideIframe('afterburn')"/> Toggle Afterburn</label>
  </div>

  <div>
    <label>
      <input type="checkbox" id="sliderToggle" checked/>
      extra Slider add here - This toggle makes the slider adjusts the widths of all screens, also prototype
    </label>
    <br>
    <label>
      <input type="range" min="375" max="600" value="375" class="slider" id="widthSlider"/>
      This slider adjusts the widths of all mobile variants - Current Width: <span id="currentWidth">375</span>px
    </label>
    <button id="btn375">375px</button>
    <button id="btn428">428px</button>
    
  </div>
  

  <div class="iframe-container">
    <div id="wireframe">
      <iframe src="./iframe_wireframe.php"></iframe>
    </div>
    <div id="wireframe428">
      <iframe class="fixed-width" style="width: 428px;" src="./iframe_wireframe.php"></iframe>
    </div>
    <div id="black">
      <iframe src="./iframe_black.php"></iframe>
    </div>
    <div id="irina">
      <iframe src="./iframe_irina.php"></iframe>
    </div>
    <div id="neon">
      <iframe src="./iframe_neon.php"></iframe>
    </div>
    <!-- <div id="afterburn">
      <iframe src="./iframe_the-white-lotus.php"></iframe>
    </div> -->
  </div>

  
</body>
<script>
  const hideIframe = (id) => {
    const iframeTarget = document.getElementById(id);
    if (!iframeTarget) {
      console.error('Iframe not found:', id);
      return;
    }
    console.log('Toggling iframe:', id, 'Current display:', iframeTarget.style.display);
    iframeTarget.style.display = iframeTarget.style.display === "none" ? "inherit" : "none";
  }

  // Slider functionality
  const widthSlider = document.getElementById('widthSlider');
  const currentWidthDisplay = document.getElementById('currentWidth');

  // Load saved width from localStorage on page load
  const savedWidth = localStorage.getItem('iframeWidth');
  if (savedWidth) {
    widthSlider.value = savedWidth;
    currentWidthDisplay.textContent = savedWidth;
    
    // Apply saved width to all iframes (except fixed-width ones)
    const iframes = document.querySelectorAll('.iframe-container iframe:not(.fixed-width)');
    iframes.forEach(iframe => {
      iframe.style.width = savedWidth + 'px';
    });
  }

  widthSlider.addEventListener('input', (event) => {
    const newWidth = event.target.value;
    currentWidthDisplay.textContent = newWidth;
    
    // Save to localStorage
    localStorage.setItem('iframeWidth', newWidth);
    
    // Update all iframe widths (except fixed-width ones)
    const iframes = document.querySelectorAll('.iframe-container iframe:not(.fixed-width)');
    iframes.forEach(iframe => {
      iframe.style.width = newWidth + 'px';
    });
  });

  // Function to set width programmatically
  const setWidth = (width) => {
    widthSlider.value = width;
    currentWidthDisplay.textContent = width;
    localStorage.setItem('iframeWidth', width);
    
    const iframes = document.querySelectorAll('.iframe-container iframe:not(.fixed-width)');
    iframes.forEach(iframe => {
      iframe.style.width = width + 'px';
    });
  };

  // Add click handlers to preset buttons
  document.getElementById('btn375').addEventListener('click', () => setWidth(375));
  document.getElementById('btn428').addEventListener('click', () => setWidth(428));
 
  </script>



</html>
