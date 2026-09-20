function NicknameInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="nickname" className="mb-2 block text-sm text-mute">
        $ whoami
      </label>
      <div className="flex items-center gap-2 rounded-md border border-line bg-ink px-3 py-2.5 focus-within:border-cursor">
        <span className="text-cursor">&gt;</span>
        <input
          id="nickname"
          name="nickname"
          type="text"
          required
          maxLength={30}
          autoComplete="off"
          placeholder="seu_nickname"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-base text-paper placeholder:text-line focus:outline-none"
        />
      </div>
    </div>
  )
}

export default NicknameInput
