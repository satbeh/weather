import "./Filters.css";

export default function Filters(props) {
  let debounceTimer = null;

  const onSearchKeywordChange = (e) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(
      () => props.onSearch(e.target.value.trim()),
      300
    );
  };

  return (
    <div className="Filters">
      <h4>Filters</h4>

      <div className="Form">
        <div className="Field">
          <label>Search by keywords</label>
          <input
            id="search"
            type="text"
            onChange={onSearchKeywordChange}
          ></input>
        </div>

        <div className="Field">
          <label>Filter by timezone</label>
          <select id="timezone">
            <option value="GMT">GMT</option>
          </select>
        </div>
      </div>
    </div>
  );
}
