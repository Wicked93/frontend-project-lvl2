import _ from 'lodash';

export default (diff) => JSON.stringify(_.cloneDeep(diff));
