// import { useEffect } from 'react';
// import { useContent } from '../../hooks/usecontet';

// export function PageThemeWrapper({ pageSlug, children }) {
//   const { getTheme } = useContent(pageSlug);
//   const theme = getTheme();

//   useEffect(() => {
//     if (!theme) return;
//     [theme.fontHeading, theme.fontBody].filter(Boolean).forEach(font => {
//       const id = `gfont-${font.replace(/\s+/g, '-')}`;
//       if (document.getElementById(id)) return;
//       const link = document.createElement('link');
//       link.id = id;
//       link.rel = 'stylesheet';
//       link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
//       document.head.appendChild(link);
//     });
//   }, [theme]);

//   if (!theme) return <>{children}</>;

//   const style = {
//     display: 'contents',
//     ...(theme.primaryColor         && { '--primary': theme.primaryColor }),
//     ...(theme.backgroundColor      && { '--background': theme.backgroundColor }),
//     ...(theme.foregroundColor      && { '--foreground': theme.foregroundColor }),
//     ...(theme.cardColor            && { '--card': theme.cardColor }),
//     ...(theme.mutedForegroundColor && { '--muted-foreground': theme.mutedForegroundColor }),
//     ...(theme.fontHeading          && { '--font-heading': `'${theme.fontHeading}', sans-serif` }),
//     ...(theme.fontBody             && { '--font-body': `'${theme.fontBody}', sans-serif` }),
//   };

//   return <div style={style}>{children}</div>;
// }




import { useEffect } from 'react';
import { useContent } from '../../hooks/usecontet';

export function PageThemeWrapper({ pageSlug, children }) {
  const { get } = useContent(pageSlug);
  const theme = get('theme', null);

  useEffect(() => {
    if (!theme) return;
    [theme.fontHeading, theme.fontBody].filter(Boolean).forEach(font => {
      const id = `gfont-${font.replace(/\s+/g, '-')}`;
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    });
  }, [theme]);

  if (!theme) return <>{children}</>;

  const style = {
    display: 'contents',
    ...(theme.primaryColor && { '--primary': theme.primaryColor }),
    ...(theme.backgroundColor && { '--background': theme.backgroundColor }),
    ...(theme.foregroundColor && { '--foreground': theme.foregroundColor }),
    ...(theme.cardColor && { '--card': theme.cardColor }),
    ...(theme.mutedForegroundColor && { '--muted-foreground': theme.mutedForegroundColor }),
    ...(theme.fontHeading && { '--font-heading': `'${theme.fontHeading}', sans-serif` }),
    ...(theme.fontBody && { '--font-body': `'${theme.fontBody}', sans-serif` }),
  };

  return <div style={style}>{children}</div>;
}