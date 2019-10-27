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

        contents = soup.findAll("div", class_="content")

        examples = []
        for content in contents:
            tweet = content.find("p", class_="TweetTextSize js-tweet-text tweet-text")
            date = content.find("span", class_="_timestamp js-short-timestamp")
            user = content.find("span", class_="username u-dir u-textTruncate")
            screen = content.find("strong", class_="fullname show-popup-with-id u-textTruncate")

            if not tweet or not user:
                continue
            else:
                examples.append({
                    "screen_name": screen.get_text().strip() if screen else user.get_text().strip(),
                    "user_name": user.get_text().strip(),
                    "tweet": tweet.get_text().strip(),
                    "date": date.get_text().strip() if date else "unavaliable",
                    "url": "twitter"
                })

        if not examples:
            return {
                "screen_name": "nofound!",
                "user_name": "nofound!",
                "tweet": "nofound!",
                "date": "nofound!",
                "url": "twitter"
            }

        return random.choice(examples)
