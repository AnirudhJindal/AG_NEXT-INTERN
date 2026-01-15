import React from 'react'

export const SearchBar = ({
  search,
  setSearch,
}: {
  search: string
  setSearch: (v: string) => void
}) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks..."
      className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
