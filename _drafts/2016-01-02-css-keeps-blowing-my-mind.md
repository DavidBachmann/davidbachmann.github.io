Responsive Typography
font-size: calc( 1rem + (2.5rem - 1rem) * ( (100vw - 400px) / ( 800 - 400) ));
font-size: calc( #{$min_font}px + (#{$max_font} - #{$min_font}) * ( (100vw - #{$min_width}px) / ( #{$max_width} - #{$min_width}) ));