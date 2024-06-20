import Item from '#models/item';
import ItemEntries from '#models/item_entry';
export default class ItemEntriesController {
    async index({ response, auth, request }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            let entries = await ItemEntries.findManyBy('user_id', userId);
            const inOut = request.qs().inOut;
            if (inOut) {
                entries = entries.filter((entry) => entry.inOut === inOut);
            }
            return response.status(200).send(entries);
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to fetch entries', error: error.message });
        }
    }
    async create({}) { }
    async store({ request, response }) {
        try {
            const data = request.body();
            const entry = await ItemEntries.create(data);
            return response.status(201).send({ message: 'Entry created successfully', data: entry });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to create entry', error: error.message });
        }
    }
    async show({ params, response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const { id } = params;
            const entry = await ItemEntries.query()
                .where('user_id', userId ?? '')
                .andWhere('id', id)
                .firstOrFail();
            return response.status(200).send(entry);
        }
        catch (error) {
            console.error(error);
            return response.status(404).send({ message: 'Entry not found', error: error.message });
        }
    }
    async edit({}) { }
    async update({ params, request, response }) {
        try {
            const { id } = params;
            const entry = await ItemEntries.findOrFail(id);
            const data = request.body();
            entry.merge(data);
            await entry.save();
            return response.status(200).send({ message: 'Entry updated successfully', data: entry });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to update entry', error: error.message });
        }
    }
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const entry = await ItemEntries.findOrFail(id);
            await entry.delete();
            return response.status(200).send({ message: `Entry with id ${id} deleted successfully` });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Failed to delete entry', error: error.message });
        }
    }
    async indexByItemId({ params, response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const { id } = params;
            const entries = await ItemEntries.findManyBy({ userId: userId, itemId: id });
            return response.status(200).send(entries);
        }
        catch (error) {
            console.error(error);
            return response.status(404).send({ message: 'Entry not found', error: error.message });
        }
    }
    async indexItemsWithLastEntry({ response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const items = await Item.query()
                .where('user_id', userId ?? '')
                .preload('itemEntries', (entriesQuery) => {
                entriesQuery.orderBy('created_at', 'desc');
            });
            const itemsWithEntries = items.filter((item) => item.itemEntries.length > 0);
            const itemsWithLastEntries = itemsWithEntries.map((item) => {
                return {
                    ...item.serialize(),
                    lastEntry: item.itemEntries[0],
                };
            });
            return response.status(200).send(itemsWithLastEntries);
        }
        catch (error) {
            console.error(error);
            return response.status(404).send({ message: 'Entry not found', error: error.message });
        }
    }
    async indexSalesOverview({ response, auth }) {
        try {
            await auth.check();
            const userId = auth.user?.id;
            if (userId === undefined) {
                return response.status(401).send({ message: 'You must login to access this resource' });
            }
            const items = await Item.query()
                .where('user_id', userId ?? '')
                .preload('itemEntries', (entriesQuery) => {
                entriesQuery.orderBy('created_at', 'desc');
            });
            const dailySales = [];
            items.forEach((item) => {
                item.itemEntries.forEach((entry) => {
                    const date = entry.createdAt.toString().split('T')[0];
                    const sales = entry.inOut === 'out' ? entry.total : 0;
                    const existingDateIndex = dailySales.findIndex((sale) => sale.date === date);
                    if (existingDateIndex !== -1) {
                        dailySales[existingDateIndex].totalSales += sales;
                    }
                    else {
                        dailySales.push({ date, totalSales: sales });
                    }
                });
            });
            dailySales.sort((a, b) => (a.date < b.date ? -1 : 1));
            return response.status(200).send(dailySales);
        }
        catch (error) {
            console.error(error);
            return response
                .status(404)
                .send({ message: 'Sales overview not found', error: error.message });
        }
    }
}
//# sourceMappingURL=item_entries_controller.js.map