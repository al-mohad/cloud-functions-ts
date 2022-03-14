import { Response } from "express";
import { db } from "./config/firbase";
type EntryType = {
	title: string,
	text: string,
}

type Request = {
	body: EntryType,
	params: { entryId: string }
}

const addEntry = async (req: Request, res: Response) => {
	const { title, text } = req.body;
	try {
		const entry = await db.collection('entries').doc();
		const entryObject = {
			id: entry.id,
			title,
			text,
		}
		entry.set(entryObject);
		res.status(200).send({ status: 'success', message: 'Entry added', data: entryObject });

	} catch (error) {
		res.status(500).send({ status: 'error', message: 'Error adding entry: ' + error });
	}
}

const getEntries = async (req: Request, res: Response) => {
	try {
		const entries: EntryType[] = [];
		const snapshots = await db.collection('entries').get();
		snapshots.forEach((doc: any) => entries.push(doc.data()));
		res.status(200).send(entries);

	} catch (error) {
		res.status(500).send({ status: 'error', message: 'Error getting entries: ' + error });
	}
}

const updateEntry = async (req: Request, res: Response) => {
	const { body: { text, title }, params: { entryId }
	} = req;
	try {
		const entry = await db.collection('entries').doc(entryId);
		const currentEntry = await (await entry.get()).data();
		const newEntry = {
			title: title || currentEntry!.title,
			text: text || currentEntry!.text,
		}
		await entry.set(newEntry);
		res.status(200).send({ status: 'success', message: 'Entry updated', data: newEntry });
	} catch (error) {
		res.status(500).send({ status: 'error', message: 'Error updating entry: ' + error });
	}
}

const deleteEntry = async (req: Request, res: Response) => {
	const { entryId } = req.params;

	try {
		const entry = await db.collection('entries').doc(entryId);
		await entry.delete();
		res.status(200).send({ status: 'success', message: 'Entry deleted' });
	} catch (error) {
		res.status(500).send({ status: 'error', message: 'Error deleting entry: ' + error });

	}

}
export { addEntry, getEntries, updateEntry, deleteEntry };