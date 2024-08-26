const apiUrl = '*characters*';

describe('Home e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept(apiUrl, (req) => {
      //mocking return as the api is unstable and has limit of requests
      req.reply(mockedResponse);
    });
  });

  it('should show skeleton and loading message when opening the application', () => {
    cy.get('#skeleton1').should('be.visible');
  });
  it('should show cards list and populate pagination when api request finishes', () => {
    cy.get('#' + mockedResponse.data.results[0].id).should('be.visible');
    cy.get('#' + mockedResponse.data.results[1].id).should('be.visible');
    cy.get('#pagination').should('be.visible');
    cy.get('#pagination').get('ul').children().should('have.length', 4);
  });
  it('should make another request passing second page when clicking on pagination', () => {
    cy.intercept(apiUrl + '*offset=40').as('getCharacters');
    cy.get('#pagination').get('ul').children().eq(2).click();
    cy.wait('@getCharacters').then((interception) => {
      expect(interception.request.url).to.include('offset=40');
    });
  });
  it('should show card details when clicking in see details', () => {
    cy.get('#see-details' + mockedResponse.data.results[0].name).click();
    cy.contains(mockedResponse.data.results[0].stories.items[0].name).should(
      'be.visible'
    );
    cy.contains(mockedResponse.data.results[0].comics.items[0].name).should(
      'be.visible'
    );
  });
});

const mockedResponse = {
  code: 200,
  status: 'Ok',
  data: {
    offset: 20,
    limit: 20,
    total: 1564,
    count: 2,
    results: [
      {
        id: 1011176,
        name: 'Ajak',
        description: '',
        modified: '1969-12-31T19:00:00-0500',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/2/80/4c002f35c5215',
          extension: 'jpg',
        },
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011176',
        comics: {
          available: 2,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1011176/comics',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/comics/21175',
              name: 'Incredible Hercules (2008) #117',
            },
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/comics/21324',
              name: 'Incredible Hercules (2008) #118',
            },
          ],
          returned: 2,
        },
        series: {
          available: 1,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1011176/series',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/series/3762',
              name: 'Incredible Hercules (2008 - 2010)',
            },
          ],
          returned: 1,
        },
        stories: {
          available: 2,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1011176/stories',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/stories/46776',
              name: 'Incredible Hercules (2008) #117',
              type: 'cover',
            },
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/stories/46777',
              name: 'Interior #46777',
              type: 'interiorStory',
            },
          ],
          returned: 2,
        },
        events: {
          available: 1,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1011176/events',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
              name: 'Secret Invasion',
            },
          ],
          returned: 1,
        },
      },
      {
        id: 1010870,
        name: 'Ajaxis',
        description: '',
        modified: '1969-12-31T19:00:00-0500',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/70/4c0035adc7d3a',
          extension: 'jpg',
        },
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1010870',
        comics: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1010870/comics',
          items: [],
          returned: 0,
        },
        series: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1010870/series',
          items: [],
          returned: 0,
        },
        stories: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1010870/stories',
          items: [],
          returned: 0,
        },
        events: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/characters/1010870/events',
          items: [],
          returned: 0,
        },
      },
    ],
  },
};
