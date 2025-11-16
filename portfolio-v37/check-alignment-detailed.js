const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Detailed Alignment Check...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto('http://localhost:3010', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const alignmentDetails = await page.evaluate(() => {
      const getStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          textAlign: styles.textAlign,
          display: styles.display,
          justifyContent: styles.justifyContent,
          alignItems: styles.alignItems,
          flexDirection: styles.flexDirection,
          marginLeft: styles.marginLeft,
          marginRight: styles.marginRight,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          maxWidth: styles.maxWidth,
          width: styles.width,
          position: {
            left: rect.left,
            right: rect.right,
            width: rect.width
          }
        };
      };

      return {
        hero: {
          section: getStyles('#about'),
          container: getStyles('#about .w-full'),
          maxWidth: getStyles('#about .max-w-5xl'),
          h1: getStyles('#about h1'),
          paragraph: getStyles('#about p'),
        },
        projects: {
          section: getStyles('#work'),
          container: getStyles('#work .container'),
          header: getStyles('#work h2'),
          card: getStyles('#work .group'),
          cardInner: getStyles('#work .bg-white\\/\\[0\\.02\\]'),
          projectTitle: getStyles('#work h3'),
        },
        skills: {
          section: getStyles('#skills'),
          header: getStyles('#skills h2'),
          card: getStyles('.skill-card'),
        },
        contact: {
          section: getStyles('#contact'),
          card: getStyles('#contact > div > div > div'),
        },
        viewport: {
          width: window.innerWidth,
          scrollbarWidth: window.innerWidth - document.documentElement.clientWidth
        }
      };
    });

    console.log('📊 Detailed Alignment Results:\n');
    console.log(JSON.stringify(alignmentDetails, null, 2));

    // Check for common alignment issues
    console.log('\n🔍 Potential Issues:\n');

    // Check Hero
    if (alignmentDetails.hero.paragraph?.textAlign !== 'center') {
      console.log('❌ Hero paragraph not centered!');
    }

    // Check Projects
    if (alignmentDetails.projects.cardInner?.textAlign !== 'center') {
      console.log('❌ Project cards not centered!');
      console.log('   Current textAlign:', alignmentDetails.projects.cardInner?.textAlign);
    }

    // Check container padding asymmetry
    if (alignmentDetails.hero.container) {
      console.log('📏 Hero container padding:');
      console.log('   Left:', alignmentDetails.hero.container.paddingLeft);
      console.log('   Right:', alignmentDetails.hero.container.paddingRight);
    }

    console.log('\n✅ Check complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
