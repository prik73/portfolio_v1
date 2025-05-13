const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/visits', (req, res) => {
  const data = JSON.parse(fs.readFileSync('counter.json'));
  data.visits += 1;
  fs.writeFileSync('counter.json', JSON.stringify(data));
  res.json({ count: data.visits });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at ${PORT}`);
});