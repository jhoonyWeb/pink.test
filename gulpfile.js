var gulp         = require('gulp');
    sass         = require('gulp-sass'); //Подключаем Scss пакет
		browserSync  = require('browser-sync'); // Подключаем Browser Sync
		concat       = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
		cssnano      = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
		del          = require('del'); // Подключаем библиотеку для удаления файлов и папок
		imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
		pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
		cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления 
		cleanCSS     = require('gulp-clean-css');
		


		
		gulp.task('browser-sync', function() { // Создаем таск browser-sync
			browserSync({ // Выполняем browser Sync
					server: { // Определяем параметры сервера
							baseDir: 'app' // Директория для сервера - app
					},
					notify: false // Отключаем уведомления
			});
	  });

	  gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss',) // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
				.pipe(cssnano()) // Сжимаем
				.pipe(cleanCSS({compatibility: 'ie8'}))
				.pipe(concat('main.css'))
				.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
				.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
		 });

		 gulp.task('css-libs', ['sass'], function() {
			return gulp.src('app/libs/slick/*.css') // Выбираем файл для минификации
					.pipe(cssnano()) // Сжимаем
					.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
					.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
	});
		 
		 

     gulp.task('scripts', function() {
		 return gulp.src([ // Берем все необходимые библиотеки
			 'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
			 'app/libs/slick/slick.min.js'
			])
			.pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле
			.pipe(uglify()) // Сжимаем JS файл
			.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
     });


      gulp.task('img', function() {
	     return gulp.src('app/img/**/*') // Берем все изображения из app
			.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
      });
	
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами // Наблюдение за другими типами файлов
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);  // Наблюдение за JS файлами в папке js
});
gulp.task('default', ['watch']); // сброс watch


gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});




gulp.task('build', ['clean', 'sass', 'scripts','img'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
			'app/css/main.min.css',
			'app/css/slick-theme.min.css',
			'app/css/slick.min.css'
			])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/*.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
});



gulp.task('clear', function () { // чистка кэша
	return cache.clearAll();
})