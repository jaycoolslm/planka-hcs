import { Client, TopicMessageSubmitTransaction } from '@hashgraph/sdk';

const client = Client.forTestnet().setOperator(
  process.env.REACT_APP_HEDERA_CLIENT_ID,
  process.env.REACT_APP_HEDERA_CLIENT_KEY,
);

export async function parseHCSMessage(accountId, amount, cardId, newList) {
  return JSON.stringify({
    accountId,
    amount,
    cardId,
    newList,
  });
}

export async function submitMessage(accountId, amount, cardId, newList) {
  const txResponse = await new TopicMessageSubmitTransaction()
    .setTopicId(process.env.REACT_APP_HEDERA_TOPIC_ID)
    .setMessage(parseHCSMessage(accountId, amount, cardId, newList))
    .execute(client);
  return txResponse.getReceipt(client);
}
