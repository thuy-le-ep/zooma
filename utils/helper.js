export const NEW_DOC_STRUCTURE = { _for: '', type: '', price: '', projectName: '', numBedroom: '', location: '', date: '', area: '', id: '', ownerName: '', phone: '', comment: '' }

export const sliceArr = (arr, startIndex, endIndex) => {
	return arr.slice(startIndex, endIndex)
}

export const sortArr = (arr, sortOn, sortBy = 'asc') => {
	var tmpArr = [...arr.sort((a, b) => naturalCompare(a[sortOn], b[sortOn]))]
	return sortBy === 'desc' ? [...tmpArr.reverse()] : tmpArr
}

const naturalCompare = (a, b) => {
	var ax = [], bx = [];

	a.toString().toLowerCase().replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
	b.toString().toLowerCase().replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

	while (ax.length && bx.length) {
		var an = ax.shift();
		var bn = bx.shift();
		var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
		if (nn) return nn;
	}

	return ax.length - bx.length;
}

export const searchArr = (arr, query) => arr.filter(doc => Object.values(doc).some(val => val.toString().toLowerCase().includes(query.toString().toLowerCase())))

export const validPhone = (phone) => /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone)
