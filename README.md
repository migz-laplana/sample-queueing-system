# Sample Queueing System

## Background
Sample ExpressJS API for a simple queueing system.

## Endpoints

### GET /getAllQueues
- retrieves all lined-up queues

### GET /getNextQueue
- retrieves the item next in-line for dequeueing

### POST /addQueue
- add an item to the queue

Headers: 

`"Content-Type": "application/json"`

Sample request body:
```
{
	"storeId": "8asf8d83",
	"customerName": "three",
	"purposeOfVisit": "just visiting"
}
```

### POST /serveNextQueue
- removes the next item in queue from the queue itself. Calling this endpoint returns the queue item removed as well as the resulting queue after said item has been removed/dequeued.


## Notes
- queue is just a local array; not yet connected to a database