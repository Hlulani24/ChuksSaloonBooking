import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const emptyForm = {
  name: "",
  description: "",
  category: "Hair",
  price: "",
  durationMinutes: "",
  isSpecial: false,
  originalPrice: "",
  available: true,
};

const CATEGORIES = ["Hair", "Nails", "Skin & Facials", "Makeup", "Spa & Massage", "Bridal"];

const formatDuration = (mins) => (mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 ? ` ${mins % 60}m` : ""}` : `${mins} min`);

const ManageServices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadServices = () => {
    setLoading(true);
    api.get("/services").then((res) => setItems(res.data)).finally(() => setLoading(false));
  };

  useEffect(loadServices, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description || "",
      category: item.category,
      price: item.price,
      durationMinutes: item.durationMinutes,
      isSpecial: item.isSpecial,
      originalPrice: item.originalPrice || "",
      available: item.available,
    });
    setImageFile(null);
    setPreview(item.image || null);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await api.put(`/services/${editingId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/services", fd, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save this service.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service? This can't be undone.")) return;
    await api.delete(`/services/${id}`);
    loadServices();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl">Services</h1>
        <button onClick={openAdd} className="btn-primary !px-5 !py-2.5 text-sm">
          <Plus size={16} /> Add service
        </button>
      </div>

      {loading ? (
        <Loader label="Loading services" />
      ) : (
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-cream/50">
              <tr>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((item) => (
                <tr key={item._id} className="bg-noir">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-surface">
                      {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </td>
                  <td className="px-4 py-3 text-cream/60">{item.category}</td>
                  <td className="px-4 py-3 text-cream/60">{formatDuration(item.durationMinutes)}</td>
                  <td className="px-4 py-3">
                    {item.isSpecial && item.originalPrice ? (
                      <>
                        <span className="mr-2 text-cream/40 line-through">R{Number(item.originalPrice).toFixed(2)}</span>
                        <span className="text-champagne">R{Number(item.price).toFixed(2)}</span>
                      </>
                    ) : (
                      <span>R{Number(item.price).toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!item.available ? (
                      <span className="rounded-full border border-cream/20 px-2.5 py-1 text-xs text-cream/50">Fully booked</span>
                    ) : item.isSpecial ? (
                      <span className="rounded-full border border-champagne/40 px-2.5 py-1 text-xs text-champagne">Offer</span>
                    ) : (
                      <span className="rounded-full border border-sage/40 px-2.5 py-1 text-xs text-sage">Available</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="mr-3 text-cream/50 hover:text-champagne" aria-label={`Edit ${item.name}`}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-cream/50 hover:text-mauve" aria-label={`Delete ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-cream/50">
                    No services yet — add your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir/80 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-line bg-surface p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl">{editingId ? "Edit service" : "Add service"}</h2>
              <button onClick={closeModal} aria-label="Close"><X size={20} className="text-cream/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-noir">
                  {preview && <img src={preview} alt="Preview" className="h-full w-full object-cover" />}
                </div>
                <label className="btn-outline cursor-pointer !px-4 !py-2 text-sm">
                  <Upload size={15} /> Upload photo
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              </div>

              <div>
                <label className="label-field" htmlFor="name">Name</label>
                <input id="name" name="name" required className="input-field" value={form.name} onChange={handleChange} />
              </div>

              <div>
                <label className="label-field" htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="2" className="input-field resize-none" value={form.description} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-field" htmlFor="category">Category</label>
                  <select id="category" name="category" className="input-field" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="durationMinutes">Duration (minutes)</label>
                  <input id="durationMinutes" name="durationMinutes" type="number" min="5" required className="input-field" value={form.durationMinutes} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="label-field" htmlFor="price">Price (R)</label>
                <input id="price" name="price" type="number" step="0.01" min="0" required className="input-field" value={form.price} onChange={handleChange} />
              </div>

              <label className="flex items-center gap-2.5 text-sm">
                <input type="checkbox" name="isSpecial" checked={form.isSpecial} onChange={handleChange} className="h-4 w-4 accent-champagne" />
                Mark as a limited offer
              </label>

              {form.isSpecial && (
                <div>
                  <label className="label-field" htmlFor="originalPrice">Original price (shown struck-through, e.g. "was R350.00")</label>
                  <input id="originalPrice" name="originalPrice" type="number" step="0.01" min="0" className="input-field" value={form.originalPrice} onChange={handleChange} />
                </div>
              )}

              <label className="flex items-center gap-2.5 text-sm">
                <input type="checkbox" name="available" checked={form.available} onChange={handleChange} className="h-4 w-4 accent-sage" />
                Available for booking
              </label>

              {error && <p className="text-sm text-mauve">{error}</p>}

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? "Saving…" : editingId ? "Save changes" : "Add service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
