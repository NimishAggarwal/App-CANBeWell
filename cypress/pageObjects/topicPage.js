import BasePage from './basePage';

class TopicPage extends BasePage {
  clickTopic(topic) {
    // handle a random new line in the topic...
    cy.contains(topic.replace('\n', ' '))
      .click();
  }

  assertHeadings(expectedHeadings, cacheId) {
    function helper() {
      cy.log(expectedHeadings);
      // https://glebbahmutov.com/cypress-examples/6.5.0/recipes/get-text-list.html
      cy.getTestId('topicRow')
        .then(($els) => (
          Cypress.$.makeArray($els)
            .map((el) => el.innerText)
        ))
        .should('deep.equalInAnyOrder', Array.from(expectedHeadings));
    }

    if (Cypress.mocha.getRunner().suite.ctx.assertedConfigsForHeadings === undefined) {
      helper();
      Object.defineProperty(Cypress.mocha.getRunner().suite.ctx, 'assertedConfigsForHeadings', {
        value: [cacheId],
        writable: true,
      });
    } else if (!Cypress.mocha.getRunner().suite.ctx.assertedConfigsForHeadings.includes(cacheId)) {
      helper();
      Cypress.mocha.getRunner().suite.ctx.assertedConfigsForHeadings.push(cacheId);
    } else {
      cy.log('This config is already checked, skip');
    }
  }
}

export default TopicPage;
