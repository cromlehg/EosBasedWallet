/* eslint-disable no-process-env */

export default function (block, id) {
  return `${process.env.TRACKER_HTTP_ENDPOINT}/transactions/${block}/${id}`;
}

/* eslint-enable no-process-env */
