const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting Puppeteer check...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Listen to console logs
  const consoleLogs = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleLogs.push({ type, text });
    console.log(`[${type.toUpperCase()}] ${text}`);
  });

  // Listen to page errors
  page.on('pageerror', error => {
    console.log(`❌ PAGE ERROR: ${error.message}`);
  });

  // Listen to request failures
  page.on('requestfailed', request => {
    console.log(`❌ REQUEST FAILED: ${request.url()}`);
  });

  try {
    console.log('📄 Navigating to http://localhost:3010...\n');
    await page.goto('http://localhost:3010', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('\n✅ Page loaded successfully!\n');

    // Check alignment issues
    console.log('🔍 Checking alignment issues...\n');

    const alignmentCheck = await page.evaluate(() => {
      const results = {
        hero: {},
        projects: {},
        skills: {},
        contact: {}
      };

      // Check Hero section
      const heroSection = document.querySelector('#about');
      if (heroSection) {
        const heroContainer = heroSection.querySelector('.max-w-5xl');
        const heroParagraph = heroSection.querySelector('p');

        results.hero = {
          containerTextAlign: heroContainer ? window.getComputedStyle(heroContainer).textAlign : 'N/A',
          paragraphTextAlign: heroParagraph ? window.getComputedStyle(heroParagraph).textAlign : 'N/A',
          containerDisplay: heroContainer ? window.getComputedStyle(heroContainer).display : 'N/A',
        };
      }

      // Check Projects section
      const projectsSection = document.querySelector('#work');
      if (projectsSection) {
        const projectHeader = projectsSection.querySelector('h2');
        const projectCard = projectsSection.querySelector('.group');

        results.projects = {
          headerTextAlign: projectHeader ? window.getComputedStyle(projectHeader).textAlign : 'N/A',
          cardTextAlign: projectCard ? window.getComputedStyle(projectCard).textAlign : 'N/A',
        };
      }

      // Check Skills section
      const skillsSection = document.querySelector('#skills');
      if (skillsSection) {
        const skillHeader = skillsSection.querySelector('h2');
        const skillCard = skillsSection.querySelector('.skill-card');

        results.skills = {
          headerTextAlign: skillHeader ? window.getComputedStyle(skillHeader).textAlign : 'N/A',
          cardTextAlign: skillCard ? window.getComputedStyle(skillCard).textAlign : 'N/A',
        };
      }

      // Check Contact section
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        const contactHeader = contactSection.querySelector('h2');
        const floatingCard = contactSection.querySelector('div[style*="background"]');

        results.contact = {
          headerTextAlign: contactHeader ? window.getComputedStyle(contactHeader).textAlign : 'N/A',
          cardTextAlign: floatingCard ? window.getComputedStyle(floatingCard).textAlign : 'N/A',
        };
      }

      return results;
    });

    console.log('📊 Alignment Check Results:');
    console.log(JSON.stringify(alignmentCheck, null, 2));

    // Take screenshot
    console.log('\n📸 Taking screenshot...');
    await page.screenshot({
      path: '/Users/Andrei/Projects/andrei/portfolio-v37/page-check.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved to page-check.png\n');

    // Summary
    console.log('\n📋 Summary:');
    console.log(`Total console logs: ${consoleLogs.length}`);
    console.log(`Errors: ${consoleLogs.filter(l => l.type === 'error').length}`);
    console.log(`Warnings: ${consoleLogs.filter(l => l.type === 'warning').length}`);

    if (consoleLogs.filter(l => l.type === 'error').length > 0) {
      console.log('\n❌ Errors found in console!');
    } else {
      console.log('\n✅ No errors in console!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('\n🏁 Puppeteer check completed!');
  }
})();
