import React, { useState, useEffect } from 'react';
import { User, Briefcase, Bell, MessageSquare, Home, Users, Search, Plus, ChevronDown, Menu, X, ThumbsUp, MessageCircle, Share2, Send, Bookmark, MoreHorizontal, Smile, Image as ImageIcon, Video, Calendar, TrendingUp, Award, Building, Globe, Eye, Settings, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';

const LinkedInApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [messageCount, setMessageCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [postText, setPostText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // HCI Principle: Visibility of system status - Auto-hide feedback
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => setFeedbackMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  // Sample data
  const currentUser = {
    name: "Sarah Johnson",
    headline: "Product Designer at TechCorp | UX Enthusiast",
    avatar: "SJ",
    connections: 847,
    profileViews: 234
  };

  const posts = [
    {
      id: 1,
      author: "John Smith",
      avatar: "JS",
      headline: "Senior Developer at InnovateTech",
      timeAgo: "2h",
      content: "Excited to announce that I'm starting a new position as Senior Full Stack Developer at InnovateTech! Looking forward to this new chapter and the amazing team I'll be working with. 🚀",
      likes: 124,
      comments: 18,
      shares: 5,
      hasLiked: false,
      image: null
    },
    {
      id: 2,
      author: "Emily Chen",
      avatar: "EC",
      headline: "UX Designer | Human-Centered Design Advocate",
      timeAgo: "5h",
      content: "Just finished an amazing workshop on cognitive walkthroughs and heuristic evaluation. Key takeaway: Always test with real users, not assumptions! Nielsen's 10 heuristics are still incredibly relevant today. What's your favorite usability testing method? 💭",
      likes: 89,
      comments: 12,
      shares: 3,
      hasLiked: true,
      image: null
    },
    {
      id: 3,
      author: "Michael Rodriguez",
      avatar: "MR",
      headline: "Tech Lead | Building scalable solutions",
      timeAgo: "1d",
      content: "Hot take: The best code is the code you don't write. Sometimes the most elegant solution is removing complexity, not adding features. Simplicity wins every time. ✨",
      likes: 256,
      comments: 45,
      shares: 12,
      hasLiked: false,
      image: null
    }
  ];

  const notifications = [
    { id: 1, type: 'like', user: 'Alex Thompson', action: 'liked your post', time: '5m ago', read: false },
    { id: 2, type: 'comment', user: 'Maria Garcia', action: 'commented on your article', time: '1h ago', read: false },
    { id: 3, type: 'connection', user: 'David Lee', action: 'accepted your connection request', time: '2h ago', read: true },
    { id: 4, type: 'mention', user: 'Sophie Martin', action: 'mentioned you in a post', time: '3h ago', read: false },
    { id: 5, type: 'job', user: 'TechCorp', action: 'posted a new job that matches your profile', time: '1d ago', read: true }
  ];

  const messages = [
    { id: 1, user: 'Robert Wilson', avatar: 'RW', message: 'Thanks for connecting! Would love to chat about...', time: '10m ago', unread: true },
    { id: 2, user: 'Jennifer Brown', avatar: 'JB', message: 'The project proposal looks great, let\'s schedule...', time: '1h ago', unread: true },
    { id: 3, user: 'Chris Anderson', avatar: 'CA', message: 'I saw your presentation at the conference...', time: '2d ago', unread: false }
  ];

  const connections = [
    { name: 'Alice Cooper', headline: 'Product Manager at StartupXYZ', avatar: 'AC', mutual: 12 },
    { name: 'Bob Martinez', headline: 'Software Engineer', avatar: 'BM', mutual: 8 },
    { name: 'Carol White', headline: 'Design Director', avatar: 'CW', mutual: 15 }
  ];

  // HCI Principle: Informative feedback
  const showFeedback = (message) => {
    setFeedbackMessage(message);
  };

  // HCI Principle: Error prevention & reversal
  const handleLike = (postId) => {
    const post = posts.find(p => p.id === postId);
    showFeedback(post.hasLiked ? 'Like removed' : 'Post liked!');
  };

  const handlePost = () => {
    if (postText.trim()) {
      showFeedback('Post published successfully!');
      setPostText('');
    } else {
      showFeedback('Please write something before posting');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* HCI Principle: Visibility of system status - Feedback Toast */}
      {feedbackMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-slide-in">
          <CheckCircle size={20} />
          <span className="font-medium">{feedbackMessage}</span>
        </div>
      )}

      {/* HCI Principle: Consistency and standards - Fixed Header Navigation */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b fixed top-0 left-0 right-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo & Search */}
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">in</span>
                </div>
                
                {/* HCI Principle: Recognition rather than recall - Search with icon */}
                <div className="relative hidden md:block">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-64 pl-10 pr-4 py-1.5 rounded ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  />
                </div>
              </div>
            </div>

            {/* HCI Principle: Flexibility and efficiency - Navigation Icons */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'network', icon: Users, label: 'My Network' },
                { id: 'jobs', icon: Briefcase, label: 'Jobs' },
                { id: 'messaging', icon: MessageSquare, label: 'Messaging', badge: messageCount },
                { id: 'notifications', icon: Bell, label: 'Notifications', badge: notificationCount }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'notifications') {
                      setShowNotifications(!showNotifications);
                      setShowMessages(false);
                      setShowProfileMenu(false);
                      setNotificationCount(0);
                    } else if (item.id === 'messaging') {
                      setShowMessages(!showMessages);
                      setShowNotifications(false);
                      setShowProfileMenu(false);
                      setMessageCount(0);
                    } else {
                      setActiveTab(item.id);
                      setShowNotifications(false);
                      setShowMessages(false);
                      setShowProfileMenu(false);
                    }
                  }}
                  className={`flex flex-col items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative ${
                    activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-xs mt-0.5">{item.label}</span>
                  {/* HCI Principle: Visibility of system status - Badge indicators */}
                  {item.badge > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              
              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                    setShowMessages(false);
                  }}
                  className={`flex flex-col items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {currentUser.avatar}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs mt-0.5">Me</span>
                    <ChevronDown size={12} />
                  </div>
                </button>

                {/* HCI Principle: User control and freedom - Profile dropdown */}
                {showProfileMenu && (
                  <div className={`absolute right-0 top-full mt-2 w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl py-2`}>
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {currentUser.avatar}
                        </div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentUser.headline}</div>
                        </div>
                      </div>
                    </div>
                    <button className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} flex items-center gap-2`}>
                      <User size={16} />
                      View Profile
                    </button>
                    <button className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} flex items-center gap-2`}>
                      <Settings size={16} />
                      Settings & Privacy
                    </button>
                    <button
                      onClick={() => {
                        setDarkMode(!darkMode);
                        showFeedback(`${darkMode ? 'Light' : 'Dark'} mode enabled`);
                      }}
                      className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} flex items-center gap-2`}
                    >
                      {darkMode ? '☀️' : '🌙'}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} flex items-center gap-2`}>
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? <X className={darkMode ? 'text-gray-300' : 'text-gray-700'} size={24} /> : <Menu className={darkMode ? 'text-gray-300' : 'text-gray-700'} size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
            <div className="px-4 py-2 space-y-1">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'network', icon: Users, label: 'My Network' },
                { id: 'jobs', icon: Briefcase, label: 'Jobs' },
                { id: 'messaging', icon: MessageSquare, label: 'Messaging' },
                { id: 'notifications', icon: Bell, label: 'Notifications' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
                    activeTab === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Notifications Dropdown - HCI Principle: Informative feedback */}
      {showNotifications && (
        <div className={`fixed top-14 right-4 w-96 max-w-[calc(100vw-2rem)] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50`}>
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map(notif => (
              <div key={notif.id} className={`px-4 py-3 ${notif.read ? 'opacity-60' : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}>
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notif.type === 'like' ? 'bg-blue-100 dark:bg-blue-900/30' : notif.type === 'comment' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                    {notif.type === 'like' ? <ThumbsUp size={16} className="text-blue-600 dark:text-blue-400" /> : 
                     notif.type === 'comment' ? <MessageCircle size={16} className="text-green-600 dark:text-green-400" /> :
                     <Users size={16} className="text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-semibold">{notif.user}</span> {notif.action}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Dropdown */}
      {showMessages && (
        <div className={`fixed top-14 right-4 w-96 max-w-[calc(100vw-2rem)] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50`}>
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Messages</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map(msg => (
              <div key={msg.id} className={`px-4 py-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>{msg.user}</p>
                      {msg.unread && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>}
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>{msg.message}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{msg.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Card */}
          <aside className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
              <div className="relative h-16 bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-xl">
                    {currentUser.avatar}
                  </div>
                </div>
              </div>
              
              <div className="pt-10 pb-4 text-center px-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{currentUser.headline}</p>
              </div>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-3`}>
                <div className="flex justify-between text-sm mb-2">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Profile viewers</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentUser.profileViews}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Connections</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentUser.connections}</span>
                </div>
              </div>
            </div>

            {/* HCI Principle: Recognition rather than recall - Quick access */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg mt-4 overflow-hidden hidden lg:block`}>
              <div className="p-4">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Recent</h4>
                <div className="space-y-2">
                  {['#userexperience', '#productdesign', '#hciprinciples'].map((item, idx) => (
                    <button key={idx} className={`w-full text-left px-2 py-1.5 rounded ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-50 text-gray-600'} text-sm`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Center Feed */}
          <div className="lg:col-span-6">
            {/* HCI Principle: Simplify task structures - Create Post Card */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-4`}>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {currentUser.avatar}
                </div>
                <button
                  onClick={() => setSelectedPostId('new')}
                  className={`flex-1 text-left px-4 py-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}
                >
                  Start a post
                </button>
              </div>

              {/* HCI Principle: User control - Post creation expanded */}
              {selectedPostId === 'new' && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="What do you want to talk about?"
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    rows="4"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Add photo">
                        <ImageIcon size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                      <button className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Add video">
                        <Video size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                      <button className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="Add emoji">
                        <Smile size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPostId(null);
                          setPostText('');
                        }}
                        className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} font-medium transition-colors`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePost}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className={`flex items-center gap-1 mt-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {[
                  { icon: ImageIcon, label: 'Photo', color: 'text-blue-600' },
                  { icon: Video, label: 'Video', color: 'text-green-600' },
                  { icon: Calendar, label: 'Event', color: 'text-orange-600' },
                  { icon: TrendingUp, label: 'Article', color: 'text-red-600' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => showFeedback(`${item.label} feature clicked`)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <item.icon size={20} className={`${item.color} ${darkMode ? 'opacity-80' : ''}`} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} hidden sm:inline`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {posts.map(post => (
                <article key={post.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {post.avatar}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} hover:underline cursor-pointer`}>{post.author}</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.headline}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1 mt-1`}>
                            {post.timeAgo} • <Globe size={12} />
                          </p>
                        </div>
                      </div>
                      <button className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}>
                        <MoreHorizontal size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="mt-3">
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} leading-relaxed`}>{post.content}</p>
                    </div>
                  </div>

                  {/* HCI Principle: Informative feedback - Engagement Stats */}
                  <div className={`px-4 py-2 flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                          <ThumbsUp size={10} className="text-white" />
                        </div>
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                          <span className="text-white text-xs">❤️</span>
                        </div>
                      </div>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>

                  {/* HCI Principle: Make things visible - Action Buttons */}
                  <div className={`px-2 py-1 flex items-center justify-around border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${
                        post.hasLiked ? 'text-blue-600 dark:text-blue-400' : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      <ThumbsUp size={20} fill={post.hasLiked ? 'currentColor' : 'none'} />
                      <span className="text-sm font-medium">Like</span>
                    </button>
                    <button
                      onClick={() => showFeedback('Comment section opened')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
                    >
                      <MessageSquare size={20} />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button
                      onClick={() => showFeedback('Share options opened')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
                    >
                      <Share2 size={20} />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                    <button
                      onClick={() => showFeedback('Post saved')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
                    >
                      <Send size={20} />
                      <span className="text-sm font-medium">Send</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* HCI Principle: Design dialogs to yield closure - Load more */}
            <div className="mt-6 text-center">
              <button
                onClick={() => showFeedback('Loading more posts...')}
                className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} font-medium transition-colors`}
              >
                Show more posts
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            {/* HCI Principle: Visual hierarchy - News Section */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn News</h3>
                <button className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:underline`}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Tech layoffs continue', readers: '2,456' },
                  { title: 'AI transforms workflows', readers: '1,893' },
                  { title: 'Remote work trends', readers: '1,234' },
                  { title: 'New UX design patterns', readers: '987' },
                  { title: 'Startup funding updates', readers: '756' }
                ].map((news, idx) => (
                  <button key={idx} className="w-full text-left group">
                    <h4 className={`font-medium text-sm ${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-900 group-hover:text-blue-600'} mb-1`}>
                      • {news.title}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{news.readers} readers</p>
                  </button>
                ))}
              </div>
            </div>

            {/* HCI Principle: Recognition rather than recall - People suggestions */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add to your feed</h3>
              </div>
              <div className="space-y-4">
                {connections.map((person, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {person.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>{person.name}</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 line-clamp-2`}>{person.headline}</p>
                      <button
                        onClick={() => showFeedback(`Following ${person.name}`)}
                        className={`px-4 py-1 rounded-full border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} text-sm font-medium transition-colors`}
                      >
                        + Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                View all recommendations →
              </button>
            </div>

            {/* Footer Links - HCI Principle: Help and documentation */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['About', 'Accessibility', 'Help Center', 'Privacy Policy', 'Advertising', 'Business Services', 'Get the App', 'More'].map((link, idx) => (
                  <button key={idx} className={`text-left ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
                    {link}
                  </button>
                ))}
              </div>
              <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">in</span>
                  </div>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>LinkedIn Corporation © 2024</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* HCI Principle: Help and documentation - Floating help button */}
      <button
        onClick={() => showFeedback('Help center opened')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
        title="Help & Support"
      >
        <span className="text-2xl font-bold">?</span>
      </button>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LinkedInApp;