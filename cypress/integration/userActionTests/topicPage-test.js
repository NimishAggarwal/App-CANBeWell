import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TopicPage from '../../pageObjects/topicPage';
import TestPage from '../../pageObjects/testPage';

devicesTestWrapper(
  'Topic Page', () => {
    const landingPage = new LandingPage();
    const topicPage = new TopicPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: topicPage.gender.male,
            Tgender: topicPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
          new BodyPage()
            .clickTestTab();
        });
        it('Tabs Exist', () => {
          topicPage.assertHThreeHeaders(locale);
        });

        it('Go to Body Page', () => {
          topicPage.clickBodyTab();
          new BodyPage()
            .assertInstructionExists(locale);
        });

        it('Go to Test Page', () => {
          topicPage.clickTestTab();
          new TestPage()
            .assertAtLeastOneHeadingDisplayed();
        });
      });
    }
  },
);
