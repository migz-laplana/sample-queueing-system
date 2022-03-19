const express = require("express");
const app = express();
const min = require("date-fns/min");

app.use(express.json());

const PORT = 3000;

const queues = [];

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Sample Queueing System" });
});

app.get("/getAllQueues", (req, res) => {
  res.send({ data: queues });
});

app.post("/addQueue", (req, res) => {
  const { storeId, customerName, purposeOfVisit } = req.body;

  const newQueue = {
    storeId,
    customerName,
    purposeOfVisit,
    dateCreated: new Date(),
  };

  queues.push(newQueue);
  res.status(200).send({
    data: newQueue,
    errors: [],
  });
});

app.get("/getNextQueue", (req, res) => {
  const allQueueDates = queues.map((item) => item.dateCreated);
  const nextQueueDate = min(allQueueDates);
  const nextQueue = queues.find(
    (item) => new Date(item.dateCreated).getTime() === nextQueueDate.getTime()
  );

  res.status(200).send({
    data: nextQueue,
    errors: [],
  });
});

app.post("/serveNextQueue", (req, res) => {
  const allQueueDates = queues.map((item) => item.dateCreated);
  const nextQueueDate = min(allQueueDates);

  const nextQueue = queues.find(
    (item) => new Date(item.dateCreated).getTime() === nextQueueDate.getTime()
  );
  const nextQueueIndex = queues.findIndex(
    (item) => new Date(item.dateCreated).getTime() === nextQueueDate.getTime()
  );
  queues.splice(nextQueueIndex, 1);

  res.status(200).send({
    data: {
      itemRemoved: nextQueue,
      currentQueue: queues,
    },
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
