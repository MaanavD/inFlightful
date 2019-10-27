from bs4 import BeautifulSoup
import requests
import re
import random

headers = {"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}

class Scraper:
    def scrape(self, query):
        raise NotImplementedError

class TwitterScraper(Scraper):
    def __init__(self):
        self._query_url = "https://twitter.com/search?q="
    
    def get_url(self, query):
        return self._query_url + query

    def scrape(self, query):
        url = self.get_url(query)
        page = requests.get(url, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')


        # screens = soup.findAll("strong", class_="fullname show-popup-with-id u-textTruncate")
        # users = soup.findAll("span", class_="username u-dir u-textTruncate")
        # dates = soup.findAll()
        # links = soup.findAll()
        tweets = soup.findAll("p", class_="TweetTextSize js-tweet-text tweet-text")

        return {
            "screen_name": 'unk',
            "user_name": 'unk',
            "tweet": random.choice(tweets).get_text().strip(),
            "date": 'today',
            "url": 'n/a'
        }


        # for tweet in tweets:
        #     print()
        #     print()
        #     print("TWEEEEEEEET:\n", tweet)
        #     print("REEEEEEEEEEEE\n", tweet.get_text())


        # content = [{
        #     "screen_name": screen,
        #     "user_name": user,
        #     "tweet": tweet,
        #     "date": date,
        #     "url": link
        # } for screen, user, tweet, date, link in zip(screens, users, tweets, dates, links)]
        # content = soup.findAll("div", class_="content")
        # for c in content:
        #     c = BeautifulSoup(c, 'html.parser')
        #     name = 
        #     print(name)
        # name = soup.findAll("span", class_"FullNameGroup")

        # print(content[0])
        # print(len(content))
        
if __name__ == "__main__":
    scrap = TwitterScraper()
    scrap.scrape("jetblue")
