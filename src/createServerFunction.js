import { createServer } from 'miragejs';

export const createServerFunction = () => {
  return createServer({
    routes() {
      this.timing = 2000;

      // GET ALL LOCAL STORAGE ITEMS
      this.get('/api/did-items-list', () => {
        return localStorage.getItem('@evo-test-project/did_items_list_1');
      });

      // ADD NEW ITEM TO LOCAL STORAGE
      this.post('/api/did-items-list', (schema, request) => {
        const new_did_item = JSON.parse(request.requestBody);
        const current_did_items_list = JSON.parse(
          localStorage.getItem('@evo-test-project/did_items_list_1')
        );
        const new_id =
          current_did_items_list[current_did_items_list.length - 1].id + 1;

        if (
          current_did_items_list.find(
            (did_item) => did_item.value === new_did_item.value
          )
        ) {
          return JSON.stringify({
            errorMessage: 'This phone number is already taken.',
            new_did_items_list: null,
          });
        } else {
          localStorage.setItem(
            '@evo-test-project/did_items_list_1',
            JSON.stringify([
              { id: new_id, ...new_did_item },
              ...current_did_items_list,
            ])
          );

          return JSON.stringify({
            errorMessage: null,
            new_did_items_list: localStorage.getItem(
              '@evo-test-project/did_items_list_1'
            ),
          });
        }
      });

      // UPDATE ITEM FROM LOCAL STORAGE
      this.put('/api/did-items-list/:id', (schema, request) => {
        const did_item_id = parseInt(request.params.id);
        const updated_did_item = JSON.parse(request.requestBody);
        const current_did_items_list = JSON.parse(
          localStorage.getItem('@evo-test-project/did_items_list_1')
        );

        // Does the item exists in the localStorage?
        if (!current_did_items_list.find((item) => item.id === did_item_id)) {
          return {
            errorMessage: 'The selected item does not exist in the database.',
            errorCode: 1,
            new_did_items_list: current_did_items_list,
          };
        }

        if (
          current_did_items_list.find(
            (item) =>
              item.value === updated_did_item.value && item.id !== did_item_id
          )
        ) {
          return JSON.stringify({
            errorMessage: 'This phone number is already taken.',
            errorCode: 2,
            new_did_items_list: current_did_items_list,
          });
        }

        const updated_did_item_list = current_did_items_list.map((item) => {
          if (item.id !== did_item_id) return { ...item };
          else return { ...updated_did_item, id: did_item_id };
        });

        localStorage.setItem(
          '@evo-test-project/did_items_list_1',
          JSON.stringify(updated_did_item_list)
        );

        return JSON.stringify({
          errorMessage: null,
          new_did_items_list: localStorage.getItem(
            '@evo-test-project/did_items_list_1'
          ),
        });
      });

      // REMOVE ITEM FROM LOCAL STORAGE
      this.delete('/api/did-items-list/:id', (schema, request) => {
        const current_did_items_list = JSON.parse(
          localStorage.getItem('@evo-test-project/did_items_list_1')
        );

        if (
          !current_did_items_list.find(
            (item) => item.id === parseInt(request.params.id)
          )
        ) {
          return JSON.stringify({
            errorMessage: 'The selected item does not exist in the database.',
            new_did_items_list: localStorage.getItem(
              '@evo-test-project/did_items_list_1'
            ),
          });
        }

        localStorage.setItem(
          '@evo-test-project/did_items_list_1',
          JSON.stringify(
            current_did_items_list.filter(
              (item) => item.id !== parseInt(request.params.id)
            )
          )
        );

        return JSON.stringify({
          errorMessage: null,
          new_did_items_list: localStorage.getItem(
            '@evo-test-project/did_items_list_1'
          ),
        });
      });
    },
  });
};
