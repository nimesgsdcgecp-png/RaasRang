import React, { useState } from 'react';
import { AHMEDABAD_COMMUNITY_GALLERY } from '../data/ahmedabadVenues';

interface GalleryItem {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  venue: string;
  night: string;
  likes: number;
  imageUrl: string;
  tag: string;
}

export const CommunityGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(AHMEDABAD_COMMUNITY_GALLERY);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // New photo state
  const [photoTitle, setPhotoTitle] = useState('');
  const [authorName, setAuthorName] = useState('Pooja Shah');
  const [venueTag, setVenueTag] = useState('GMDC Ground Vastrapur, Ahmedabad');
  const [categoryTag, setCategoryTag] = useState('Dancer Moments');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl || !photoTitle.trim()) return;

    const newItem: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: photoTitle.trim(),
      author: authorName.trim() || 'Festive Dancer',
      authorAvatar:
        previewUrl ||
        'https://lh3.googleusercontent.com/aida/AEtjO1XSSAo9EwrWR5z8KvDQQs3O-yBHeNK8u2w24JGeXA5fFws1UWIFsY-saDOX_CisiTDTDpI-waAFCgC8UzxTX1_NOPgta5JNszdoIDooOIslfLQojSwIKYDK9agCjz0qncvqoBbPUxzyxXT2Fad2iRxQcHjiUsvjdSiNEDxuLFLOlFuhvacNCXyre4f2gqodDivwFHdcPn1hXmlSvOqHuApkhzMDHvIj3FdFWkj6zM07Lpnh4utpdthYLCo',
      venue: venueTag,
      night: 'Day 3 & 4',
      likes: 12,
      imageUrl: previewUrl,
      tag: categoryTag,
    };

    setItems([newItem, ...items]);
    setShowUploadModal(false);
    setPhotoTitle('');
    setPreviewUrl('');
  };

  const handleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
            Ahmedabad Navratri Stream
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">
            Ground Snapshots &amp; Community Moments
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Photos shared by dancers across GMDC, Karnavati Club, Rajpath, and SG Highway arenas.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          <span>Upload Your Photo</span>
        </button>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-[#151824] border border-amber-500/20 shadow-lg flex flex-col justify-between hover:border-amber-500/50 transition-all"
          >
            <div className="relative h-64 overflow-hidden bg-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

              {/* Tag pill */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                {item.tag}
              </div>

              {/* Like heart */}
              <button
                onClick={() => handleLike(item.id)}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white hover:text-red-400 text-xs font-bold flex items-center gap-1 transition-colors border border-slate-700"
              >
                <span className="material-symbols-outlined text-sm text-red-500">favorite</span>
                <span>{item.likes}</span>
              </button>

              {/* Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white flex flex-col">
                <span className="font-headline text-sm font-bold leading-tight">{item.title}</span>
                <span className="text-[11px] text-amber-200/90">{item.venue}</span>
              </div>
            </div>

            {/* Author bar */}
            <div className="p-3 bg-[#11141E] flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <img
                  src={item.authorAvatar}
                  alt={item.author}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-orange-500"
                />
                <span className="font-medium text-slate-200">{item.author}</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">{item.night}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#151824] border border-amber-500/30 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400 text-xl">add_photo_alternate</span>
                <h3 className="font-headline text-lg font-bold text-white">Upload Navratri Snap</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g. My Mirror-work Chaniya Choli at GMDC Ground"
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Ahmedabad Ground / Venue</label>
                <select
                  value={venueTag}
                  onChange={(e) => setVenueTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="GMDC Ground Vastrapur, Ahmedabad">GMDC Ground Vastrapur, Ahmedabad</option>
                  <option value="Karnavati Club SG Highway, Ahmedabad">Karnavati Club SG Highway, Ahmedabad</option>
                  <option value="Rajpath Club Bodakdev, Ahmedabad">Rajpath Club Bodakdev, Ahmedabad</option>
                  <option value="Shankus Water World Grounds, Bopal">Shankus Water World Grounds, Bopal</option>
                  <option value="Mirchi Rock N Dhol Paldi, Ahmedabad">Mirchi Rock N Dhol Paldi, Ahmedabad</option>
                  <option value="YMCA International Club SG Highway">YMCA International Club SG Highway</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={categoryTag}
                  onChange={(e) => setCategoryTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Dancer Moments">Dancer Moments</option>
                  <option value="Costume & Dandiya">Costume &amp; Dandiya</option>
                  <option value="Concentric Rings">Concentric Rings</option>
                  <option value="Midnight Aarti">Midnight Aarti</option>
                  <option value="Smart Parking">Smart Parking &amp; Entry</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Photo File *</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
                />
              </div>

              {previewUrl && (
                <div className="h-40 rounded-xl overflow-hidden border border-amber-500/40 bg-black mt-1">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold transition-all shadow-md"
                >
                  Upload &amp; Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
