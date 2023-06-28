#! /usr/bin/env node

const fs = require('fs').promises;
const { glob } = require('glob');

async function listCheckedA11yComponents() {
  const components = glob.sync('src/components/@(beta|stable|legacy)/*');

  const output = await Promise.all(
    components.map(async component => {
      const a11yChecklistFiles = glob.sync(
        `${component}/a11yManualChecklist.md`
      );
      const hasA11yChecklistFile = !!a11yChecklistFiles[0];
      let hasPassingA11yChecks = '--';
      if (component.includes('legacy')) {
        hasPassingA11yChecks = 'N/A';
      }
      if (hasA11yChecklistFile) {
        const contents = await fs.readFile(a11yChecklistFiles[0], 'utf8');
        hasPassingA11yChecks = contents.includes('❌') ? '❌' : '✅';
      }

      let componentName = component.split('/')[3];
      return { componentName, hasPassingA11yChecks };
    })
  );

  console.table(output, ['componentName', 'hasPassingA11yChecks']);
}

listCheckedA11yComponents();
