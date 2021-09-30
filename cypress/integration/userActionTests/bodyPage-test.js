import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TestPage from '../../pageObjects/testPage';
import TopicPage from '../../pageObjects/topicPage';

devicesTestWrapper(
  'Body Page', () => {
    const landingPage = new LandingPage();
    const bodyPage = new BodyPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: bodyPage.gender.male,
            Tgender: bodyPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
        });
        it('Verify Tabs exist', () => {
          bodyPage.assertHThreeHeaders(locale);
        });
        it('Go to Test Page', () => {
          bodyPage.clickTestTab();
          new TestPage()
            .assertAtLeastOneHeadingDisplayed();
        });
        it('Go to Topic Page', () => {
          bodyPage.clickTopicTab();
          new TopicPage()
            .assertAtLeastOneHeadingDisplayed();
        });
      });
    }
  },
);
