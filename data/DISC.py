
import asyncio
from os import environ
import discord

client = discord.Client()
@client.event
async def on_ready():
  print('We have logged in as {0.user}'.format(client))

async def sendmessage():
  ids = [119126498799124480]
  for id in ids:
    user = await client.fetch_user(int(id))
    await user.send("testing this")



async def DISCORD_runNotifBot(message):
  await sendmessage()
  return


if __name__ == '__main__':
  asyncio.run(DISCORD_runNotifBot("aa"))


client.run(environ.get('DISCORD_BOT_SECRET'))
